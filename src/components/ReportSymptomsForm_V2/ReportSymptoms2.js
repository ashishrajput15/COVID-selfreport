import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reportsActions from '../../actions/reports';

class ReportSymptoms2 extends React.Component {
  constructor(props) {
    super(props);

    const { mapCenter } = props;
    this.state = {
      symptoms: props.symptoms,
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
    this.sendReport = this.sendReport.bind(this);

    this.map = null;
    this.marker = null;

    this.sendReportStarted = false;
  }

  componentDidMount() {
    this.prepareMap();
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

  onFormFieldUpdate(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  sendReport() {
    this.props.actions.sendReportStarting();
    this.props.actions.sendReport(this.state);
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
            mapCenter: {
              lat: pos.lat(),
              lng: pos.lng(),
            },
            mapZoom: this.map.getZoom(),

            markedLat: pos.lat(),
            markedLng: pos.lng(),

            street: '',
            city: '',
            district: '',
            state: '',
            pincode: '',
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
    const { jumpToStep, sendNewReport } = this.props;
    const { markedLat, markedLng } = this.state;

    let btnSave;
    if (sendNewReport.saving) {
      btnSave = (
        <Button
          color="danger"
          disabled
        >
          <i className="fa fa-spin fa-spinner" />&nbsp;Confirm and Send Report
        </Button>
      )
    } else {
      btnSave = (
        <Button
          color="danger"
          onClick={this.sendReport}
          disabled={markedLat === null || markedLng === null}
        >
          <i className="fa fa-exclamation-triangle" />&nbsp;Confirm and Send Report
        </Button>
      );
    }

    return (
      <div>
        <h5>Confirm your location</h5>
        <br />

        <Row>
          <Col xs={12} md={12}>
            <p>Drag the marker to pin-point to the desired location on the map below.</p>

            <div id="map2" style={{ width: '100%', height: '250px' }} />

            <div id="autocomplete-textbox"></div>
          </Col>
        </Row>

        <br />

        <div className="report-symptoms-modal-footer">
          <Row>
            <Col xs={6}>
              <Button
                color="light"
                onClick={() => {
                  jumpToStep(1);
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
      </div>
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
