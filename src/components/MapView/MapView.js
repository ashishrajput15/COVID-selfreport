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
import MapControls from './MapControls';
import { MapStyle1, MapStyle2, MarkerClusterStyles } from '../../../tools/constants';
import imgSingleReportMarker from '../../assets/marker_single_case.png';

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
        lat: 23.259933,
        lng: 77.412613,
      },

      mapAccuracy: 0,
      mapZoom: 5,

      viewType: 'reported',
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

    if (viewType === 'confirmed') {
      if (this.props.patientsData !== nextProps.patientsData) {
        if (this.props.patientsData.loading !== nextProps.patientsData.loading && nextProps.patientsData.loaded) {
          // data was reloaded
          this.updateMarkersOnMap(nextProps.patientsData);
        }
      }
    } else if (viewType === 'reported') {
      if (this.props.reportsData !== nextProps.reportsData) {
        if (this.props.reportsData.loading !== nextProps.reportsData.loading && nextProps.reportsData.loaded) {
          // data was reloaded
          this.updateMarkersOnMap(nextProps.reportsData);
        }
      }
    } else if (viewType === 'help_requests') {
      if (this.props.helpRequests !== nextProps.helpRequests) {
        if (this.props.helpRequests.loading !== nextProps.helpRequests.loading && nextProps.helpRequests.loaded) {
          // data was reloaded
          this.updateMarkersOnMap(nextProps.helpRequests);
        }
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
    const { mapCenter, viewType } = this.state;
    if (viewType === 'confirmed') {
      this.props.actions.getPatientsDataStarting();
      this.props.actions.getPatientsData(mapCenter.lat, mapCenter.lng, 2000, viewType);
    } else if (viewType === 'reported') {
      this.props.actions.getReportsDataStarting();
      this.props.actions.getReportsData(mapCenter.lat, mapCenter.lng, 2000);
    } else if (viewType === 'help_requests') {
      this.props.actions.getHelpRequestsStarting();
      this.props.actions.getHelpRequests(mapCenter.lat, mapCenter.lng, 2000);
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

          this.setState({
            mapCenter: {
              lat: mapCenter.lat(),
              lng: mapCenter.lng(),
            }
          });

          const currentZoom = this.map.getZoom();
          if (currentZoom <= 15) {
            this.map.set('styles', MapStyle1);
          } else {
            this.map.set('styles', MapStyle2);
          }
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

    const { ids, map } = data;
    if (!ids.length) {
      // TODO Delete any existing markers from before
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
    const { showMap, isMapLoaded, mapCenter, viewType } = this.state;

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
          onViewTypeChanged={this.onViewTypeChanged}
          viewType={viewType}
        />
      </div>
    );
  }
}

MapView.defaultProps = {
  actions: {},
  helpRequests: {},
  patientsData: {},
};

MapView.propTypes = {
  actions: PropTypes.object,
  helpRequests: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  patientsData: PropTypes.object,
  reportsData: PropTypes.object,
};

const mapStateToProps = (state => ({
  helpRequests: state.helpRequests,
  patientsData: state.patientsData,
  reportsData: state.reportsData,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, helpRequestsActions, patientsActions, reportsActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
