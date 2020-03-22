import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

class ReportSymptoms2 extends React.Component {
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
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
    };

    this.onFormFieldUpdate = this.onFormFieldUpdate.bind(this);
    this.onDoorNoChanged = this.onFormFieldUpdate.bind(this, 'doorNo');
    this.onBuildingNameChanged = this.onFormFieldUpdate.bind(this, 'buildingName');
    this.onStreetChanged = this.onFormFieldUpdate.bind(this, 'street');
    this.onCityChanged = this.onFormFieldUpdate.bind(this, 'city');
    this.onDistrictChanged = this.onFormFieldUpdate.bind(this, 'district');
    this.onStateChanged = this.onFormFieldUpdate.bind(this, 'state');
    this.onPincodeChanged = this.onFormFieldUpdate.bind(this, 'pincode');

    this.map = null;
    this.marker = null;
  }

  componentDidMount() {
    this.prepareMap();
  }

  onFormFieldUpdate(name, event) {
    this.setState({
      [name]: event.target.value,
    });
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
          zoomControl: false,
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

        google.maps.event.addListener(this.marker, 'dragend', () => {
          const pos = this.marker.getPosition();

          this.map.setCenter(pos);

          const currentZoom = this.map.getZoom();
          if (currentZoom < 13) {
            this.map.setZoom(15);
          }

          this.setState({
            mapCenter: pos,
          });

          this.geocodeAddress();
        });

        this.geocodeAddress();
      }, 400);
    }
  }

  geocodeAddress() {
    const { google } = window;
    if (!google) {
      setTimeout(() => {
        this.prepareMap();
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

        const { address_components } = results[0];
        address_components.forEach((component) => {
          if (component.types.indexOf('street_address') !== -1) {
            this.setState({
              street: component.long_name,
            });
          }

          if (component.types.indexOf('route') !== -1 && this.state.street === '') {
            this.setState({
              street: component.long_name,
            });
          }

          if (component.types.indexOf('administrative_area_level_1') !== -1) {
            this.setState({
              state: component.long_name,
            });
          }

          if (component.types.indexOf('administrative_area_level_2') !== -1) {
            this.setState({
              district: component.long_name,
            });
          }

          if (
            (component.types.indexOf('locality') !== -1) ||
            (component.types.indexOf('sublocality') !== -1) ||
            (component.types.indexOf('administrative_area_level_3') !== -1)
          ) {
            this.setState({
              city: component.long_name,
            });
          }

          if (component.types.indexOf('postal_code') !== -1) {
            this.setState({
              pincode: component.short_name,
            });
          }
        });
      } else {
        console.log('Failed to get the place at given latlng');
      }
    });
  }

  render() {
    const { jumpToStep } = this.props;
    const {
      doorNo, buildingName, street,
      city, district, state, pincode,
    } = this.state;

    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <p>Drag the marker to pin-point to the desired location on the map below.</p>

            <div id="map2" style={{ width: '100%', height: '250px' }} />
          </Col>

          <Col xs={12} md={6} className="mt-4 mt-md-0">
            <FormGroup>
              <Label htmlFor="doorNo">Door No.</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder=""
                value={doorNo}
                onChange={this.onDoorNoChanged}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="buildingName">Building Name</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder=""
                value={buildingName}
                onChange={this.onBuildingNameChanged}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="streetName">Street</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Lane 5"
                value={street}
                onChange={this.onStreetChanged}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="city">City</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="City"
                value={city}
                onChange={this.onCityChanged}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="district">District</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder=""
                value={district}
                onChange={this.onDistrictChanged}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="state">State</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder=""
                value={state}
                onChange={this.onStateChanged}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="pincode">Pin Code</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder=""
                value={pincode}
                onChange={this.onPincodeChanged}
              />
            </FormGroup>

            <br />

            <div className="report-symptoms-modal-footer">
              <Button color="primary" onClick={() => {
                jumpToStep(1);
              }}>
                <i className="fa fa-arrow-left" />&nbsp;Back
              </Button>
              <Button color="primary" onClick={() => {
                jumpToStep(3);
              }}>
                <i className="fa fa-arrow-right" />&nbsp;Next
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ReportSymptoms2.defaultProps = {
  jumpToStep: () => {
  },
};

ReportSymptoms2.propTypes = {
  jumpToStep: PropTypes.func,
  mapCenter: PropTypes.object.isRequired,
};

export default ReportSymptoms2;
