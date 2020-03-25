import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
} from 'reactstrap';
import { getAddress } from '../../util';

class PickLocation extends React.Component {
  constructor(props) {
    super(props);

    const { mapCenter } = props;
    this.state = {
      mapCenter,
      mapZoom: 15,
      markedLat: null,
      markedLng: null,

      doorNo: '',
      buildingName: '',
      address: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    };

    this.onFormFieldUpdate = this.onFormFieldUpdate.bind(this);
    this.onAddressChanged = this.onFormFieldUpdate.bind(this, 'address');
    this.onDoorNoChanged = this.onFormFieldUpdate.bind(this, 'doorNo');
    this.onBuildingNameChanged = this.onFormFieldUpdate.bind(this, 'buildingName');
    this.onStreetChanged = this.onFormFieldUpdate.bind(this, 'street');
    this.onCityChanged = this.onFormFieldUpdate.bind(this, 'city');
    this.onDistrictChanged = this.onFormFieldUpdate.bind(this, 'district');
    this.onStateChanged = this.onFormFieldUpdate.bind(this, 'state');
    this.onPincodeChanged = this.onFormFieldUpdate.bind(this, 'pincode');
    this.clearAddress = this.clearAddress.bind(this);
    this.onMarkerDrop = this.onMarkerDrop.bind(this);
    this.onAutocompletePlaceChanged = this.onAutocompletePlaceChanged.bind(this);
    this.fixMapZoom = this.fixMapZoom.bind(this);
    this.geocodeAddress = this.geocodeAddress.bind(this);
    // this.setAddressComponents = this.setAddressComponents.bind(this);
    this.goToUserLocation = this.goToUserLocation.bind(this);
    this.onGeolocationSuccess = this.onGeolocationSuccess.bind(this);
    this.onGeolocationError = this.onGeolocationError.bind(this);


    this.autocomplete = null;
    this.map = null;
    this.marker = null;

  }

  componentDidMount() {
    this.prepareMap();
  }

  componentWillReceiveProps() {   // eslint-disable-line react/no-deprecated
  }

  onFormFieldUpdate(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  clearAddress() {
    this.setState({
      address: '',
    });

    document.getElementById('pac-input2').focus();
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
        this.setState({...getAddress(place)});
        // this.setAddressComponents(place);
      } else {
        console.log('Failed to get the place at given latlng');
      }
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
    // this.setAddressComponents(place);
    this.setState({...getAddress(place)});
  }

  render() {
    const { saving, goBackAction, confirmAction } = this.props;
    const { markedLat, markedLng, address } = this.state;

    let btnSave;
    if (saving) {
      btnSave = (
        <Button
          color="danger"
          disabled
        >
          <i className="fa fa-spin fa-spinner" />&nbsp;Please wait
        </Button>
      )
    } else {
      btnSave = (
        <Button
          color="danger"
          onClick={() => confirmAction(this.state)}
          disabled={markedLat === null || markedLng === null}
        >
          &nbsp;Confirm
        </Button>
      );
    }

    return (
      <div>
        <h5 className="mb-3">Confirm your location</h5>

        <InputGroup className="mb-3">
          <Input
            placeholder="Search Location"
            id="pac-input2"
            value={address}
            onChange={this.onAddressChanged}
          />
          <InputGroupAddon addonType="append" onClick={this.clearAddress} className="pointer link">
            <InputGroupText>
              <i className="fa fa-search" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <p>Drag the marker to pin-point to the desired location on the map below.</p>

        <div id="map2" style={{ width: '100%', height: '300px' }} />

        <div id="autocomplete-textbox"></div>

        <br />

        <div className="report-symptoms-modal-footer">
          <Row>
            <Col xs={6}>
              <Button
                color="light"
                onClick={() => {
                  goBackAction();
                }}
              >
                <i className="fa fa-arrow-left" />&nbsp;Back
              </Button>
            </Col>
            <Col xs={6} className="text-right">
              {btnSave}
            </Col>
          </Row>
        </div>

        <div id="btn-gps-container2">
          <button className="btn btn-light" onClick={this.goToUserLocation} title="Use your current location">
            <i className="fa fa-compass" />
          </button>
        </div>
      </div>
    );
  }
}

PickLocation.propTypes = {
  mapCenter: PropTypes.object.isRequired,
  saving: PropTypes.bool,
  goBackAction: PropTypes.func,
  confirmAction: PropTypes.func,
};


export default PickLocation;
