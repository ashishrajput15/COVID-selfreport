/*
 global MarkerClusterer, google
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as patientsActions from '../../actions/patients';
import * as reportActions from '../../actions/report';
import MapControls from './MapControls';
import ReportCase from '../ReportModals/ReportCase';

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
    };

    this.map = null;
    this.markers = [];
    this.markerClusterer = null;

    this.onGeolocationSuccess = this.onGeolocationSuccess.bind(this);
    this.onGeolocationError = this.onGeolocationError.bind(this);

    // This marker is to get the application node to set up the modals
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onGeolocationSuccess, this.onGeolocationError, {
      enableHighAccuracy: true,
      timeout: 60 * 1000,
      maximumAge: 0
    });
  }

  componentWillReceiveProps(nextProps) {   // eslint-disable-line react/no-deprecated
    if (this.props.patientsData !== nextProps.patientsData) {
      if (this.props.patientsData.loading !== nextProps.patientsData.loading && nextProps.patientsData.loaded) {
        // data was reloaded
        this.updateMarkersOnMap(nextProps.patientsData);
      }
    }
  }

  // This function is to get the node of the application to host the modal
  getApplicationNode = () => {
    return document.getElementById('map');
  };

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

      this.props.actions.getPatientsData(crd.latitute, crd.longitude, 2000, 'confirmed');
    } catch (err) {
      this.setState({
        showMap: true,
        userDeniedGeolocation: false,
      });

      const { mapCenter } = this.state;
      this.props.actions.getPatientsData(mapCenter.lat, mapCenter.lng, 2000, 'confirmed');
    }

    this.prepareMap();
  }

  onGeolocationError(/* err */) {
    //console.warn(`ERROR(${err.code}): ${err.message}`);

    this.setState({
      showMap: true,
      userDeniedGeolocation: true,
    });

    const { mapCenter } = this.state;
    this.props.actions.getPatientsDataStarting();
    this.props.actions.getPatientsData(mapCenter.lat, mapCenter.lng, 2000, 'confirmed');

    this.prepareMap();
  }

  prepareMap() {
    const { google } = window;
    if (!google) {
      setTimeout(() => {
        this.prepareMap();
      }, 1000);
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
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
          },

          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },

          scaleControl: false,

          streetViewControl: false,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
          },

          fullscreenControl: false,
        });

        const pacContainer = document.getElementById('pac-container');
        const pacInput = document.getElementById('pac-input');
        const searchBox = new google.maps.places.SearchBox(pacInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(pacContainer);

        this.map.addListener('bounds_changed', () => {
          searchBox.setBounds(this.map.getBounds());
        });

        const btnPlus = document.getElementById('btn-plus-container');
        this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(btnPlus);

        const btnExtras = document.getElementById('btn-extras-container');
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(btnExtras);

        const btnSelect = document.getElementById('btn-select-container');
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(btnSelect);

        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();

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
    }

    return null;
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

  render() {
    const { showMap, isMapLoaded, mapCenter } = this.state;
    const toggleModal = {
      reportCase: this.props.actions.toggleReportCase,
      reportSymptoms: this.props.actions.toggleReportSymptoms,
      requestHelp: this.props.actions.toggleRequestHelp,
    };
    const reporterActions = {
      reporterState: this.props.actions.setReporterState,
      reporterSymptoms: this.props.actions.setReporterSymptoms,
      reporterDetails: this.props.actions.setReporterDetails,
    }

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
          isMapLoaded={isMapLoaded}
          mapCenter={mapCenter}
          toggleModal={toggleModal}
        />

        { this.props.reportModals.reportCaseModal &&
        <ReportCase
          reporterActions={reporterActions}
          toggleModal={this.props.actions.toggleReportCase}
          />
        }
        {this.props.reportModals.reportSymptoms && <ReportCase toggleModal={this.props.actions.toggleReportSymptoms}/>}
        {this.props.reportModals.requestHelp && <ReportCase toggleModal={this.props.actions.toggleRequestHelp}/>}

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
  reportModals: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state => ({
  patientsData: state.patientsData,
  reportModals: state.reportModal,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, patientsActions, reportActions),
    dispatch,
    ),
  }));

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
