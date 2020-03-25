import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Container, Button } from 'react-floating-action-button';
import { InfoCard } from "./InfoCard";
import ReportSymptomsModal_V2 from './ReportSymptomsModal_V2';
import RequestHelpModal from './RequestHelpModal';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import marker1 from '../../assets/marker1.png';
import marker2 from '../../assets/marker2.png';
import marker3 from '../../assets/marker3.png';

class MapControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateName: '',
      showStateHelplineNumber: false,
      showKeyInfo: false,
      showReportSymptomsModal: false,
      showRequestHelpModal: false,
    };

    this.hideAllCards = this.hideAllCards.bind(this);
    this.toggleReportSymptomsModal = this.toggleReportSymptomsModal.bind(this);
    this.toggleRequestHelpModal = this.toggleRequestHelpModal.bind(this);
  }

  componentDidMount() {
    if (this.props.mapCenter) {
      this.getstateFromCordinates(this.props.mapCenter);
    }

    this.toggleReportSymptomsModal();
  }

  componentWillReceiveProps(nextProps) { // eslint-disable-line react/no-deprecated
    if (this.props.mapCenter !== nextProps.mapCenter) {
      if (this.props.mapCenter.lat !== nextProps.mapCenter.lat || this.props.mapCenter.lng !== nextProps.mapCenter.lng) {
        this.getstateFromCordinates(nextProps.mapCenter);
      }
    }
  }

  hideAllCards() {
    this.setState({
      showStateHelplineNumber: false,
      showKeyInfo: false
    });
  }

  toggleReportSymptomsModal() {
    const { showReportSymptomsModal } = this.state;
    this.setState({
      showReportSymptomsModal: !showReportSymptomsModal,
    });
  }

  toggleRequestHelpModal() {
    const { showRequestHelpModal } = this.state;
    this.setState({
      showRequestHelpModal: !showRequestHelpModal,
    })
  }

  getstateFromCordinates = (location) => {
    const { google } = window;
    if (!google) {
      return;
    }

    new google.maps.Geocoder().geocode(
      {
        location,
      },
      (result, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (result[0]) {
            let add = result[0].formatted_address;
            let value = add.split(",");
            let count = value.length;
            const state = value[count - 2];
            this.setState({ stateName: state });
          } else {
            //alert("address not found");
          }
        } else {
          //alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  toggleHelplineBar = () =>
    this.setState({
      showStateHelplineNumber: !this.state.showStateHelplineNumber,
      showKeyInfo: false,
      showReportSymptomsModal: false,
      showRequestHelpModal: false,
    });

  toggleKeyInfoBar = () =>
    this.setState({
      showKeyInfo: !this.state.showKeyInfo,
      showStateHelplineNumber: false,
      showReportSymptomsModal: false,
      showRequestHelpModal: false,
    });

  render() {
    const { isMapLoaded, clearSearchBox, goToUserLocation, mapCenter, onViewTypeChanged, viewType } = this.props;
    const { stateName, showStateHelplineNumber, showKeyInfo, showReportSymptomsModal, showRequestHelpModal } = this.state;

    let reportSymptomsModal = null;
    let requestHelpModal = null;
    if (showReportSymptomsModal) {
      reportSymptomsModal = (
        <ReportSymptomsModal_V2
          mapCenter={mapCenter}
          toggleHelplineBar={this.toggleHelplineBar}
          toggleKeyInfoBar={this.toggleKeyInfoBar}
          toggleModal={this.toggleReportSymptomsModal}
        />
      );
    }
    if (showRequestHelpModal) {
      requestHelpModal = (
        <RequestHelpModal
          mapCenter={mapCenter}
          toggleHelplineBar={this.toggleHelplineBar}
          toggleKeyInfoBar={this.toggleKeyInfoBar}
          toggleModal={this.toggleRequestHelpModal}
        />
      )
    }

    return (
      <div>
        <div id="pac-container" className={classnames({ 'input-group mb-3': true, 'd-none': !isMapLoaded })}>
          <input type="text" className="form-control controls" id="pac-input" placeholder="Search location"
                 aria-label="Search location" />

          <div className="input-group-append pointer link" onClick={clearSearchBox}>
            <span className="input-group-text">
              <i className="fa fa-search" />
            </span>
          </div>
        </div>

        <div id="btn-plus-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <Container>
            <Button
              // className="fab-item btn btn-danger btn-link text-white"
              tooltip="Request Help"
              icon="fa fa-ambulance"
              // rotate={false}
              onClick={this.toggleRequestHelpModal}
            />
            <Button
              // className="fab-item btn btn-danger btn-link text-white"
              tooltip="Report Symptoms"
              icon="fa fa-exclamation-triangle"
              // rotate={false}
              onClick={this.toggleReportSymptomsModal}
            />
            <Button
              className="fab-item btn btn-danger btn-link text-white"
              tooltip="New Request"
              icon="fa fa-plus"
              rotate={false}
            />
          </Container>
        </div>

        <div id="btn-extras-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <button className="btn btn-primary" onClick={this.toggleKeyInfoBar}>
            Key Info
          </button>
          <span className="d=block d-sm-none"><br /></span>
          <button className="btn btn-primary ml-0 ml-sm-3 mt-2 mt-sm-0"
                  onClick={this.toggleHelplineBar}>
            Helpline Nos
          </button>
          {showKeyInfo &&
          <InfoCard
            toggle={this.hideAllCards}
            cardType={InfoCard.cardTypes.KEY_INFO}
          />
          }
          {showStateHelplineNumber &&
          <InfoCard
            stateName={stateName}
            cardType={InfoCard.cardTypes.HELPLINE}
            toggle={this.hideAllCards}
          />
          }
        </div>

        <div id="btn-select-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">View</h5>

              <Form>
                <FormGroup check>
                  <Label check>
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="rdoViewType"
                      id="rdoViewTypeReported"
                      value="reported"
                      checked={viewType === 'reported'}
                      onChange={onViewTypeChanged}
                    />
                    {' '}
                    Symptom Reports
                  </Label>
                </FormGroup>

                <FormGroup check title="Currently unavailable.">
                  <Label check>
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="rdoViewType"
                      id="rdoViewTypeHelpRequests"
                      value="help_requests"
                      checked={viewType === 'help_requests'}
                      onChange={onViewTypeChanged}
                    />
                    {' '}
                    Help Requests
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="rdoViewType"
                      id="rdoStatusConfirmed"
                      value="confirmed"
                      checked={viewType === 'confirmed'}
                      onChange={onViewTypeChanged}
                    />
                    {' '}
                    Confirmed Cases
                  </Label>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>

        <div id="legend-container" className={classnames({ 'input-group mb-3': true, 'd-none': !isMapLoaded })}>
          <div id="legend-input" className="p-2">
            <h6 className="text-muted">Legend</h6>
            <div className="legend-input clearfix">
              <img className="float-left" src={marker1} width="25" alt="Less than 10" />
              <div className="badge text-wrap text-muted">Less than 10</div>
            </div>
            <div className="legend-input clearfix">
              <img className="float-left" src={marker2} width="25" alt="10 - 100" />
              <div className="badge text-wrap text-muted">10 - 100</div>
            </div>
            <div className="legend-input clearfix">
              <img className="float-left" src={marker3} width="25" alt="Greater than 100" />
              <div className="badge text-wrap text-muted">Greater than 100</div>
            </div>
          </div>
        </div>

        <div id="btn-gps-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <button className="btn btn-light" onClick={goToUserLocation}>
            <i className="fa fa-compass" />
          </button>
        </div>

        {reportSymptomsModal}
        {requestHelpModal}
      </div>
    )
  }
}

MapControls.propTypes = {
  clearSearchBox: PropTypes.func.isRequired,
  goToUserLocation: PropTypes.func.isRequired,
  isMapLoaded: PropTypes.bool.isRequired,
  mapCenter: PropTypes.object.isRequired,
  onViewTypeChanged: PropTypes.func.isRequired,
  viewType: PropTypes.string.isRequired,
};

export default MapControls;
