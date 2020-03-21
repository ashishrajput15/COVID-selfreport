import React from 'react';
import classnames from 'classnames';
import { Container, Button, Link } from 'react-floating-action-button';
import {STATE_HELPLINE_NUMBERS} from "../../tools/constants";
import Fuse from "fuse.js"

const mapContainerHeight = `${window.innerHeight - 1}px`;

const locations = [
  // Mumbai
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},
  {lat: 19.076090, lng: 72.877426},

  // Bangalore
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },
  { lat: 12.971442, lng: 77.581643 },

  // Delhi
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },
  { lat: 28.644800, lng: 77.216721 },

  // Lucknow
  { lat: 26.850000, lng: 80.949997 },
  { lat: 26.850000, lng: 80.949997 },
  { lat: 26.850000, lng: 80.949997 },
  { lat: 26.850000, lng: 80.949997 },

];

function noop(){};
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
      isMapLoaded: false,
      userDeniedGeolocation: false,
      mapCenter: {
        lat: 21.125498,
        lng: 81.914063
      },
      mapAccuracy: 0,
      mapZoom: 5,
      showStateHelplineNumber:false
    };
    this.map = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onGeolocationSuccess, this.onGeolocationError, {
      enableHighAccuracy: true,
      timeout: 60 * 1000,
      maximumAge: 0
    });
  }

  onGeolocationSuccess = (pos) => {
    try {
      const { coords: crd } = pos;
      this.getstateFromCordinates(crd);
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

  onGeolocationError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    this.setState({
      showMap: true,
      userDeniedGeolocation: true,
    });

    this.prepareMap();
  }
  getstateFromCordinates = ({ latitude, longitude }) =>
    new google.maps.Geocoder().geocode(
      {
        location: { lat: latitude, lng: longitude }
      },
      (result, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (result[0]) {
            let add = result[0].formatted_address;
            let value = add.split(",");
            let count = value.length;
            const state = value[count-2];
            this.setState({state});
          } else {
            alert("address not found");
          }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      }
    );
  parsedHelplineNum = state => {
    const stateNames = Object.keys(STATE_HELPLINE_NUMBERS);
    const options = {
      shouldSort: true,
      threshold: 0.8,
      location: 0,
      distance: 600,
      minMatchCharLength: 1,
      keys: ["stateName"]
    };
    const fuseS = new Fuse(STATE_HELPLINE_NUMBERS, options);
    return fuseS.search(state)[0].item.phoneNo;
  }
  toggleHelplineBar = () =>
    this.setState({
      showStateHelplineNumber: !this.state.showStateHelplineNumber
    });
  prepareMap() {
    const { isMapLoaded } = this.state;

    if (!isMapLoaded && this.map === null) {
      this.map = {};

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

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var markers = locations.map(function (location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(this.map, markers,
          { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

        this.setState({
          isMapLoaded: true,
        });
      }, 400);
    }

    return null;
  }

  render() {
    const { showMap, isMapLoaded, state, showStateHelplineNumber } = this.state;
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

        <div id="pac-container" className={classnames({ 'input-group mb-3': true, 'd-none': !isMapLoaded })}>
          <input type="text" className="form-control controls" id="pac-input" placeholder="Search"
                 aria-label="Search" />
          <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-times" />
              </span>
          </div>
        </div>

        <div id="btn-plus-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <Container>
            <Link
              href="#"
              onClick={() => console.log('Clicked on Report case')}
              tooltip="Report a Case"
              icon="far fa-sticky-note"
            />
            <Link
              href="#"
              onClick={() => console.log('Clicked on Report Symptoms')}
              tooltip="Report Symptoms"
              icon="far fa-sticky-note"
            />
            <Link
              href="#"
              onClick={() => console.log('Clicked on Request Help')}
              tooltip="Request Help"
              icon="fas fa-sticky-note"
            />
            <Button
              className="fab-item btn btn-success btn-link btn-lg text-white"
              tooltip="Add"
              icon="fas fa-plus"
              rotate={false}
              styles={{ backgroundColor: '#368435', color: '#ffffff' }}
              onClick={() => {
              }}
            />
          </Container>
        </div>

        <div id="btn-extras-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <button className="btn btn-primary">
            Key Info
          </button>

          <button className="btn btn-primary ml-3" onClick={state?this.toggleHelplineBar:noop}>
            Helpline Nos
          </button>
        {state && showStateHelplineNumber &&
        <div className="card" style={{width: '18rem'}}>
          <div className="card-body">
            <h5 className="card-title">Helpline number</h5>
            <h6 className="card-subtitle mb-2 text-muted">{state}</h6>
            <p className="card-text">
              {this.parsedHelplineNum(state)}
            </p>
          </div>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">National Helpline Number</h6>
            <p className="card-text">1075 | 1800-112-545</p>
          </div>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Central Helpline Number</h6>
            <p className="card-text">+91-11-23978043 | +91-11-23978046</p>
          </div>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Central Helpline Email</h6>
            <p className="card-text">ncov2019@gmail.com</p>
          </div>
        </div>
        }
        </div>
        <div id="btn-select-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <div className="form-group">
            <select defaultValue="confirmed" className="form-control" id="exampleFormControlSelect1">
              <option value="confirmed">Confirmed</option>
              <option value="symptoms">Symptoms</option>
              <option value="help_requests">Help Request</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
