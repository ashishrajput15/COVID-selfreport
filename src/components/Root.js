import React from 'react';
import { compose, withProps } from "recompose";

const mapContainerHeight = `${window.innerHeight - 1}px`;

class Root extends React.Component {
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
    this.onGeolocationSuccess = this.onGeolocationSuccess.bind(this);
    this.onGeolocationError = this.onGeolocationError.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onGeolocationSuccess, this.onGeolocationError, {
      enableHighAccuracy: true,
      timeout: 60 * 1000,
      maximumAge: 0
    });
  }

  onGeolocationSuccess(pos) {
    try {
      const crd = pos.coords;
      //console.log('Your current position is:');
      //console.log(`Latitude : ${crd.latitude}`);
      //console.log(`Longitude: ${crd.longitude}`);
      //console.log(`More or less ${crd.accuracy} meters.`);

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
    } catch (err) {
      this.setState({
        showMap: true,
        userDeniedGeolocation: false,
      });
    }

    this.prepareMap();
  }

  onGeolocationError(err) {
    //console.warn(`ERROR(${err.code}): ${err.message}`);

    this.setState({
      showMap: true,
      userDeniedGeolocation: true,
    });

    this.prepareMap();
  }

  prepareMap() {
    const { isMapLoaded } = this.state;

    if (!isMapLoaded && this.map === null) {
      this.map = {};

      setTimeout(() => {
        const { mapZoom, mapCenter } = this.state;
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: mapCenter,
          zoom: mapZoom,
          disableDefaultUI: true,
        });

        this.setState({
          isMapLoaded: true,
        });
      }, 400);
    }

    return null;
  }

  render() {
    const { showMap, isMapLoaded } = this.state;

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
      </div>
    );
  }
}

export default Root;
