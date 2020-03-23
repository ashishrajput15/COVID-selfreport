import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reportsActions from '../../actions/reports';
import PickLocation from '../CommonUI/PickLocation';

class ReportSymptoms2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorAlertShown: false,

      symptoms: props.symptoms,
      numDays: props.numDays,

      markedLat: '',
      markedLng: '',
    };


    this.sendReportStarted = false;
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {   // eslint-disable-line react/no-deprecated
    if (this.props.sendNewReport !== nextProps.sendNewReport) {
      if (this.props.sendNewReport.saving !== nextProps.sendNewReport.saving) {
        this.handleToasts(nextProps);
      }
    }
  }

  handleToasts(props) {
    if (this.sendReportStarted) {
      const { sendNewReport } = props;
      if (!sendNewReport.saving && sendNewReport.saved) {
        this.sendReportStarted = false;
        this.props.jumpToStep(3);

        // Refresh Markers
        const { markedLat, markedLng } = this.state;
        this.props.actions.getReportsDataStarting();
        this.props.actions.getReportsData(markedLat, markedLng, 2000);
      } else if (!sendNewReport.saving && !sendNewReport.saved) {
        const errorMsg = sendNewReport.error ? sendNewReport.error :
          ('Your report could not be saved due to unforeseen errors. ' +
          'If this problem persists, please get in touch with us in our Telegram group.');

        alert(errorMsg);
        this.sendReportStarted = false;
      }
    }
  }

  setMarkedLatLng = (markedLat, markedLng) => {
    this.setState({ markedLat, markedLng });
  }

  sendReport = (mapState) => {
    this.setMarkedLatLng(mapState.markedLat, mapState.markedLng);
    this.props.actions.sendReportStarting();
    this.props.actions.sendReport(Object.assign({}, this.state, mapState));
    this.sendReportStarted = true;
  }

  prepareMap() {
    const { google } = window;
    if (!google) {
      setTimeout(() => {
        this.prepareMap();
      }, 400);
      return;
    }

    if (this.map === null) {
      setTimeout(() => {
        const { mapZoom, mapCenter } = this.state;
        this.map = new google.maps.Map(document.getElementById('map2'), {
          center: mapCenter,
          zoom: mapZoom,
          disableDefaultUI: false,

          mapTypeControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
          scaleControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        this.map.addListener('bounds_changed', () => {
        });

        this.marker = new google.maps.Marker({
          map: this.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: mapCenter,
        });

        google.maps.event.addListener(this.marker, 'dragend', this.onMarkerDrop);

        this.geocodeAddress();

        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input2'));
        this.autocomplete.bindTo('bounds', this.map);
        this.autocomplete.setFields(['formatted_address', 'address_components', 'geometry', 'icon', 'name']);
        this.autocomplete.addListener('place_changed', this.onAutocompletePlaceChanged);

        const btnGps = document.getElementById('btn-gps-container2');
        this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(btnGps);

        this.goToUserLocation();
      }, 100);
    }
  }

  onMarkerDrop() {
    const pos = this.marker.getPosition();
    this.afterMarkerChanged(pos.lat(), pos.lng(), true);
  }

  afterMarkerChanged(lat, lng, runGeocoder) {
    this.map.setCenter({
      lat,
      lng,
    });

    this.fixMapZoom();

    this.setState({
      mapCenter: {
        lat,
        lng,
      },
      mapZoom: this.map.getZoom(),

      markedLat: lat,
      markedLng: lng,

      address: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    });

    if (runGeocoder) {
      this.geocodeAddress();
    }
  }

  fixMapZoom() {
    const currentZoom = this.map.getZoom();
    if (currentZoom < 13) {
      this.map.setZoom(15);
    }
  }

  geocodeAddress() {
    const { google } = window;
    if (!google) {
      setTimeout(() => {
        this.geocodeAddress();
      }, 400);
      return;
    }

    const pos = this.marker.getPosition();
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      latLng: pos,
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        //console.log('User moved marker to this place');
        //console.log(results[0]);
        const place = results[0];
        this.setAddressComponents(place);
      } else {
        console.log('Failed to get the place at given latlng');
      }
    });
  }

  setAddressComponents(place) {
    let address = '', street = '', state = '',
      district = '', city = '', pincode = '';

    if (place.address_components) {
      place.address_components.forEach((component) => {
        if (component.types.indexOf('street_address') !== -1) {
          street = component.long_name;
        }

        if (component.types.indexOf('route') !== -1 && street === '') {
          street = component.long_name;
        }

        if (component.types.indexOf('administrative_area_level_1') !== -1) {
          state = component.long_name;
        }

        if (component.types.indexOf('administrative_area_level_2') !== -1) {
          district = component.long_name;
        }

        if (
          (component.types.indexOf('locality') !== -1) ||
          (component.types.indexOf('sublocality') !== -1) ||
          (component.types.indexOf('administrative_area_level_3') !== -1)
        ) {
          city = component.long_name;
        }

        if (component.types.indexOf('postal_code') !== -1) {
          pincode = component.short_name;
        }
      });
    }

    if (place.formatted_address) {
      address = place.formatted_address;
    }

    this.setState({
      address,
      street,
      state,
      district,
      city,
      pincode,
    });
  }

  goToUserLocation(event) {
    navigator.geolocation.getCurrentPosition(this.onGeolocationSuccess, this.onGeolocationError, {
      enableHighAccuracy: true,
      timeout: 60 * 1000,
      maximumAge: 0
    });

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onGeolocationSuccess(pos) {
    try {
      const { coords: crd } = pos;
      this.marker.setPosition({
        lat: crd.latitude,
        lng: crd.longitude,
      });
      this.afterMarkerChanged(crd.latitude, crd.longitude, true);
    } catch (err) {
      console.error('Failed to get geolocation');
    }
  }

  onGeolocationError(err) {
    // console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === 2) {
      if (!this.state.errorAlertShown) {
        alert('Unable to get your location.');

        this.setState({
          errorAlertShown: true,
        });
      }
    }
  }

  onAutocompletePlaceChanged() {
    const place = this.autocomplete.getPlace();

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      //window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    const pos = place.geometry.location;
    this.marker.setPosition(pos);
    this.afterMarkerChanged(pos.lat(), pos.lng());
    this.setAddressComponents(place);
  }

  render() {
    const { jumpToStep, sendNewReport, mapCenter } = this.props;
    return (
      <PickLocation
        saving={sendNewReport.saving}
        goBackAction={() => jumpToStep(1)}
        confirmAction={(mapState) => this.sendReport(mapState)}
        mapCenter={mapCenter}
      />
    );
  }
}

ReportSymptoms2.defaultProps = {
  actions: {},
  jumpToStep: () => {
  },
  sendNewReport: {},
};

ReportSymptoms2.propTypes = {
  actions: PropTypes.object,
  jumpToStep: PropTypes.func,
  mapCenter: PropTypes.object.isRequired,
  numDays: PropTypes.string.isRequired,
  sendNewReport: PropTypes.object,
  symptoms: PropTypes.object.isRequired,
};

const mapStateToProps = (state => ({
  sendNewReport: state.sendNewReport,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, reportsActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(ReportSymptoms2);
