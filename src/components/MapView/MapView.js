/*
 global MarkerClusterer, google
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as helpRequestsActions from '../../actions/requestHelp';
import * as patientsActions from '../../actions/patients';
import * as reportsActions from '../../actions/reports';
import * as languageActions from '../../actions/language';
import MapControls from './MapControls';
import { MapStyle1, MapStyle2, MarkerClusterStyles } from '../../../tools/constants';
import imgSingleReportMarker from '../../assets/marker_single_case.png';
import { getAddress, cookie } from '../../util';
import { messages } from '../../../tools/messages';
import { round } from 'lodash';
import { defaultRadius, minZoom } from '../../api/config';

const mapContainerHeight = `${window.innerHeight - 1}px`;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
      isMapLoaded: false,

      userDeniedGeolocation: false,
      errorAlertShown: false,

      mapCenter: {
        lat: 12.972442,
        lng: 77.580643,
      },

      mapAccuracy: 0,
      mapZoom: minZoom,
      mapZoomErrorNotif: false,

      viewType: 'reported',

      address: '',
      street: '',
      state: '',
      district: '',
      city: '',
      pincode: '',
    };

    this.map = null;
    this.markers = [];
    this.markerClusterer = null;
    this.pacInput = null;
    this.searchBox = null;

    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.goToUserLocation = this.goToUserLocation.bind(this);
    this.onGeolocationSuccess = this.onGeolocationSuccess.bind(this);
    this.onGeolocationError = this.onGeolocationError.bind(this);
    this.onViewTypeChanged = this.onViewTypeChanged.bind(this);

    let prefLng = cookie.getCookie('lng');
    if (!(prefLng !== 'en' && prefLng !== '')) {
      cookie.setCookie('lng', 'en');
    }
  }

  componentDidMount() {
    this.setState({
      showMap: true,
    });

    setTimeout(() => {
      this.refreshData();
    }, 100);

    this.prepareMap();
  }

  componentWillReceiveProps(nextProps) {   // eslint-disable-line react/no-deprecated
    const { viewType } = this.state;
    const latlngKey = this.getLatLngKey();

    if (viewType === 'confirmed') {
      if (this.props.patientsData !== nextProps.patientsData && this.props.patientsData[latlngKey] && nextProps.patientsData[latlngKey]) {
        if (this.props.patientsData[latlngKey].loading !== nextProps.patientsData[latlngKey].loading && nextProps.patientsData[latlngKey].loaded) {
          // data was reloaded
          this.updateMarkersOnMap(nextProps.patientsData);
        }
      }
    } else if (viewType === 'reported') {
      if (this.props.reportsData !== nextProps.reportsData && this.props.reportsData[latlngKey] && nextProps.reportsData[latlngKey]) {
        if (this.props.reportsData[latlngKey].loading !== nextProps.reportsData[latlngKey].loading && nextProps.reportsData[latlngKey].loaded) {
          // data was reloaded
          this.updateMarkersOnMap(nextProps.reportsData);
        }
      }

      if (this.props.sendNewReport.saving !== nextProps.sendNewReport.saving && nextProps.sendNewReport.saved) {
        this.refreshData();
      }
    } else if (viewType === 'help_requests') {
      if (this.props.helpRequests !== nextProps.helpRequests && this.props.helpRequests[latlngKey] && nextProps.helpRequests[latlngKey]) {
        if (this.props.helpRequests[latlngKey].loading !== nextProps.helpRequests[latlngKey].loading && nextProps.helpRequests[latlngKey].loaded) {
          // data was reloaded
          this.updateMarkersOnMap(nextProps.helpRequests);
        }
      }

      if (this.props.sendNewReqHelp.saving !== nextProps.sendNewReqHelp.saving && nextProps.sendNewReqHelp.saved) {
        this.refreshData();
      }
    }
  }

  getLatLngKey() {
    const { mapCenter, viewType } = this.state;
    let { lat, lng } = mapCenter;
    lat = round(lat, 1);
    lng = round(lng, 1);
    return `${viewType}-${lat}-${lng}-${defaultRadius}`;
  }

  geocodeAddress(mapCenter) {
    const { google } = window;

    if (!google) {
      setTimeout(() => {
        this.geocodeAddress(mapCenter);
      }, 400);
      return;
    }

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      latLng: mapCenter,
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        setTimeout(() => console.log('Preventing OVER_QUERY_LIMIT error'), 5000);
      }
      if (status === google.maps.GeocoderStatus.OK) {
        //console.log('User moved marker to this place');
        //console.log(results[0]);
        const place = results[0];
        this.refreshData();
        this.setState({ ...getAddress(place) });
        // this.setAddressComponents(place);
      } else {
        console.log('Failed to get the place at given latlng');
      }
    });
  }

  onGeolocationSuccess(pos) {
    try {
      const { coords: crd } = pos;

      this.setState({
        showMap: true,
        userDeniedGeolocation: false,
        mapCenter: {
          lat: crd.latitude,
          lng: crd.longitude,
        },
        mapAccuracy: crd.accuracy,
        mapZoom: 12,
      });

      setTimeout(() => {
        this.refreshData();
      }, 100);
    } catch (err) {
      this.setState({
        showMap: true,
        userDeniedGeolocation: false,
      });

      setTimeout(() => {
        this.refreshData();
      }, 100);
    }

    this.prepareMap();
  }

  refreshData() {
    const { mapCenter, viewType, state, mapZoomErrorNotif } = this.state;
    const latlngKey = this.getLatLngKey();

    if (viewType === 'confirmed') {
      const { patientsData } = this.props;
      if (!mapZoomErrorNotif && (!patientsData[latlngKey] || (!patientsData[latlngKey].loading && !patientsData[latlngKey].loaded))) {
        this.props.actions.getPatientsDataStarting(mapCenter.lat, mapCenter.lng, defaultRadius, viewType);
        this.props.actions.getPatientsData(state, mapCenter.lat, mapCenter.lng, defaultRadius, viewType);
      } else {
        this.updateMarkersOnMap(patientsData);
      }
    } else if (viewType === 'reported') {
      const { reportsData } = this.props;
      if (!mapZoomErrorNotif && (!reportsData[latlngKey] || (!reportsData[latlngKey].loading && !reportsData[latlngKey].loaded))) {
        this.props.actions.getReportsDataStarting(mapCenter.lat, mapCenter.lng, defaultRadius, viewType);
        this.props.actions.getReportsData(state, mapCenter.lat, mapCenter.lng, defaultRadius, viewType);
      } else {
        this.updateMarkersOnMap(reportsData);
      }
    } else if (viewType === 'help_requests') {
      const { helpRequests } = this.props;
      if (!mapZoomErrorNotif && (!helpRequests[latlngKey] || (!helpRequests[latlngKey].loading && !helpRequests[latlngKey].loaded))) {
        this.props.actions.getHelpRequestsStarting(mapCenter.lat, mapCenter.lng, defaultRadius, viewType);
        this.props.actions.getHelpRequests(state, mapCenter.lat, mapCenter.lng, defaultRadius, viewType);
      } else {
        this.updateMarkersOnMap(helpRequests);
      }
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

    this.setState({
      showMap: true,
      userDeniedGeolocation: (err.code === 1),
    });

    setTimeout(() => {
      this.refreshData();
    }, 100);

    this.prepareMap();
  }

  prepareMap() {
    const { google } = window;
    if (!google) {
      setTimeout(() => {
        this.prepareMap();
      }, 400);
      return;
    }

    const { isMapLoaded } = this.state;

    if (!isMapLoaded && this.map === null) {
      setTimeout(() => {
        const { mapZoom, mapCenter } = this.state;
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: mapCenter,
          zoom: mapZoom,
          disableDefaultUI: false,

          mapTypeControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,

          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },

          scaleControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        this.map.set('styles', MapStyle1);

        const pacContainer = document.getElementById('pac-container');
        this.pacInput = document.getElementById('pac-input');
        this.searchBox = new google.maps.places.SearchBox(this.pacInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(pacContainer);

        this.map.addListener('bounds_changed', () => {
          this.searchBox.setBounds(this.map.getBounds());
          const mapCenter = this.map.getCenter();

          const currentZoom = this.map.getZoom();
          if (currentZoom <= 15) {
            this.map.set('styles', MapStyle1);
          } else {
            this.map.set('styles', MapStyle2);
          }

          this.setState({
            mapCenter: {
              lat: mapCenter.lat(),
              lng: mapCenter.lng(),
            },

            mapZoomErrorNotif: currentZoom < minZoom,
          });

          setTimeout(() => {
            // this.geocodeAddress(mapCenter);
            this.refreshData();
          }, 100);
        });

        const btnPlus = document.getElementById('btn-plus-container');
        this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(btnPlus);

        const btnExtras = document.getElementById('btn-extras-container');
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(btnExtras);

        const btnSelect = document.getElementById('btn-select-container');
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(btnSelect);

        const btnGps = document.getElementById('btn-gps-container');
        this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(btnGps);

        this.searchBox.addListener('places_changed', () => {
          const places = this.searchBox.getPlaces();

          if (places.length === 0) {
            return;
          }

          // For each place, get the icon, name and location.
          this.map.setCenter(places[0].geometry.location);
          this.map.setZoom(14);

          this.setState({
            mapCenter: places[0].geometry.location,
          });
        });

        this.setState({
          isMapLoaded: true,
        });

        //setTimeout(() => {
        //  this.getUserLocation();
        //}, 400);
      }, 400);
    }

    return null;
  }

  clearSearchBox() {
    this.pacInput.value = "";
    this.pacInput.focus();
  }

  updateMarkersOnMap(data) {
    if (this.map === null) {
      setTimeout(() => {
        this.updateMarkersOnMap(data);
      }, 1000);

      return;
    }

    if (this.markerClusterer !== null) {
      this.markerClusterer.clearMarkers();
    }

    if (this.markers.length > 0) {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });

      this.markers = [];
    }

    const latlngKey = this.getLatLngKey();
    if (!data[latlngKey]) {
      return;
    }

    const latlngData = data[latlngKey];
    const { ids, map } = latlngData;
    if (!ids || !ids.length) {
      return;
    }

    const markerImage = new google.maps.MarkerImage(
      imgSingleReportMarker,
      new google.maps.Size(50, 50)
    );

    this.markers = ids.map((_id) => {
      const obj = map[_id];

      if (!obj.loc || !obj.loc.coordinates || !obj.loc.coordinates.length) {
        return null;
      }

      // TODO Handle marker on click
      return new google.maps.Marker({
        position: {
          lat: obj.loc.coordinates[1],
          lng: obj.loc.coordinates[0],
        },
        icon: markerImage,
      });
    });

    // Add a marker clusterer to manage the markers.
    this.markerClusterer = new MarkerClusterer(this.map, this.markers,
      {
        styles: MarkerClusterStyles,
        clusterClass: 'reporter-custom-clustericon',
      });
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(this.onGeolocationSuccess, this.onGeolocationError, {
      enableHighAccuracy: true,
      timeout: 60 * 1000,
      maximumAge: 0
    });
  }

  goToUserLocation() {
    this.getUserLocation();
  }

  onViewTypeChanged(event) {
    this.setState({
      viewType: event.target.value,
    });

    setTimeout(() => {
      this.refreshData();
    }, 100);
  }

  render() {
    const { showMap, isMapLoaded, mapCenter, viewType, mapZoomErrorNotif } = this.state;
    const { intl } = this.props;

    return (
      <div>
        {!showMap && (
          <div style={{ width: '100%', height: mapContainerHeight, textAlign: 'center', marginTop: '2rem' }}>
            <h2>
              {intl.formatMessage(messages.mapViewMainHeading)}
            </h2>

            <p>Allow location access to load information at your current location.</p>
          </div>
        )}

        {(showMap && !isMapLoaded) && (
          <div style={{ width: '100%', height: mapContainerHeight, textAlign: 'center', marginTop: '2rem' }}>
            <h2>
              {intl.formatMessage(messages.mapViewMainHeading)}
            </h2>

            <p>Fetching latest data...</p>
          </div>
        )}

        <div id="map" style={{ width: '100%', height: mapContainerHeight }}>

        </div>

        <MapControls
          clearSearchBox={this.clearSearchBox}
          goToUserLocation={this.goToUserLocation}
          isMapLoaded={isMapLoaded}
          mapCenter={mapCenter}
          onViewTypeChanged={this.onViewTypeChanged}
          viewType={viewType}
          intl={intl}
          mapZoomErrorNotif={mapZoomErrorNotif}
        />
      </div>
    );
  }
}

MapView.defaultProps = {
  actions: {},
  helpRequests: {},
  intl: {},
  patientsData: {},
  sendNewReport: {},
  sendNewReqHelp: {},
};

MapView.propTypes = {
  actions: PropTypes.object,
  helpRequests: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  patientsData: PropTypes.object,
  reportsData: PropTypes.object,
  intl: PropTypes.object,
  sendNewReport: PropTypes.object,
  sendNewReqHelp: PropTypes.object,
};

const mapStateToProps = (state => ({
  helpRequests: state.helpRequests,
  patientsData: state.patientsData,
  reportsData: state.reportsData,
  intl: state.language.intl,
  sendNewReport: state.sendNewReport,
  sendNewReqHelp: state.sendNewReqHelp,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, helpRequestsActions, patientsActions, reportsActions, languageActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
