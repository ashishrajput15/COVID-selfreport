/*
 global MarkerClusterer, google
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as patientsActions from '../../actions/patients';
import MapControls from './MapControls';

const mapContainerHeight = `${window.innerHeight - 1}px`;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
      isMapLoaded: false,

      userDeniedGeolocation: false,

      mapCenter: {
        lat: 21.125498,
        lng: 81.914063,
      },

      mapAccuracy: 0,
      mapZoom: 5,

      status: 'confirmed',
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
    this.onStatusChanged = this.onStatusChanged.bind(this);
  }

  componentDidMount() {
    this.setState({
      showMap: true,
    });

    setTimeout(() => {
      this.refreshPatientsData();
    }, 100);

    this.prepareMap();
  }

  componentWillReceiveProps(nextProps) {   // eslint-disable-line react/no-deprecated
    if (this.props.patientsData !== nextProps.patientsData) {
      if (this.props.patientsData.loading !== nextProps.patientsData.loading && nextProps.patientsData.loaded) {
        // data was reloaded
        this.updateMarkersOnMap(nextProps.patientsData);
      }
    }
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
        mapZoom: 8,
      });

      setTimeout(() => {
        this.refreshPatientsData();
      }, 100);
    } catch (err) {
      this.setState({
        showMap: true,
        userDeniedGeolocation: false,
      });

      setTimeout(() => {
        this.refreshPatientsData();
      }, 100);
    }

    this.prepareMap();
  }

  refreshPatientsData() {
    const { mapCenter, status } = this.state;
    this.props.actions.getPatientsDataStarting();
    this.props.actions.getPatientsData(mapCenter.lat, mapCenter.lng, 2000, status);
  }

  onGeolocationError(err) {
    // console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === 2) {
      alert('Unable to get your location.');
    }

    this.setState({
      showMap: true,
      userDeniedGeolocation: (err.code === 1),
    });

    setTimeout(() => {
      this.refreshPatientsData();
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

          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },

          scaleControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const pacContainer = document.getElementById('pac-container');
        this.pacInput = document.getElementById('pac-input');
        this.searchBox = new google.maps.places.SearchBox(this.pacInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(pacContainer);

        this.map.addListener('bounds_changed', () => {
          this.searchBox.setBounds(this.map.getBounds());
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
      }, 400);
    } else if (this.map !== null) {
      // map init already done
      const { mapCenter, mapZoom } = this.state;
      this.map.setCenter(mapCenter);
      this.map.setZoom(mapZoom);
    }

    return null;
  }

  clearSearchBox() {
    this.pacInput.value = "";
    this.pacInput.focus();
  }

  updateMarkersOnMap(patientsData) {
    if (this.map === null) {
      setTimeout(() => {
        this.updateMarkersOnMap(patientsData);
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

    const { ids, map } = patientsData;
    if (!ids.length) {
      // TODO Delete any existing markers from before
      return;
    }

    this.markers = ids.map((patientId) => {
      const patient = map[patientId];

      // TODO Handle marker on click
      return new google.maps.Marker({
        position: {
          lat: patient.loc.coordinates[1],
          lng: patient.loc.coordinates[0],
        },
        label: patient.name,
      });
    });

    // Add a marker clusterer to manage the markers.
    this.markerClusterer = new MarkerClusterer(this.map, this.markers,
      {
        //imageSizes: [106, 112, 132, 156, 180],
        imageSizes: [53, 56, 66, 78, 90],
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
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

  onStatusChanged(event) {
    this.setState({
      status: event.target.value,
    });

    setTimeout(() => {
      this.refreshPatientsData();
    }, 100);
  }

  render() {
    const { showMap, isMapLoaded, mapCenter, status } = this.state;

    return (
      <div>
        {!showMap && (
          <div style={{ width: '100%', height: mapContainerHeight, textAlign: 'center', marginTop: '2rem' }}>
            <h2>COVID 19 Self Reporting Tool</h2>

            <p>Allow location access to load information at your current location.</p>
          </div>
        )}

        {(showMap && !isMapLoaded) && (
          <div style={{ width: '100%', height: mapContainerHeight, textAlign: 'center', marginTop: '2rem' }}>
            <h2>COVID 19 Self Reporting Tool</h2>

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
          onStatusChanged={this.onStatusChanged}
          status={status}
        />
      </div>
    );
  }
}

MapView.defaultProps = {
  actions: {},
  patientsData: {},
};

MapView.propTypes = {
  actions: PropTypes.object,
  patientsData: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state => ({
  patientsData: state.patientsData,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, patientsActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
