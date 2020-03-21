import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Container, Button, Link } from 'react-floating-action-button';
import { InfoCard } from "./InfoCard";

function noop() {
}
class MapControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateName: '',
      showStateHelplineNumber: false,
      showKeyInfo: false
    }
  }

  componentDidMount() {
    if (this.props.mapCenter) {
      this.getstateFromCordinates(this.props.mapCenter);
    }
  }

  componentWillReceiveProps(nextProps) { // eslint-disable-line react/no-deprecated
    if (this.props.mapCenter !== nextProps.mapCenter) {
      if (this.props.mapCenter.lat !== nextProps.mapCenter.lat || this.props.mapCenter.lng !== nextProps.mapCenter.lng) {
        this.getstateFromCordinates(nextProps.mapCenter);
      }
    }
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
      showKeyInfo: this.state.showKeyInfo && false
    });

  toggleKeyInfoBar = () =>
    this.setState({
      showKeyInfo: !this.state.showKeyInfo,
      showStateHelplineNumber: this.state.showStateHelplineNumber && false
    })

  render() {
    const { isMapLoaded, clearSearchBox, onStatusChanged, status } = this.props;
    const { stateName, showStateHelplineNumber, showKeyInfo } = this.state;

    return (
      <div>
        <div id="pac-container" className={classnames({ 'input-group mb-3': true, 'd-none': !isMapLoaded })}>
          <input type="text" className="form-control controls" id="pac-input" placeholder="Search"
                 aria-label="Search" />

          <div className="input-group-append pointer link" onClick={clearSearchBox}>
            <span className="input-group-text">
              <i className="fa fa-times" />
            </span>
          </div>
        </div>

        <div id="btn-plus-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <Container>
            <Link
              href="#"
              onClick={() => console.log('Clicked on Report case')}
              tooltip="Report a Case"
              icon="fa fa-sticky-note"
            />
            <Link
              href="#"
              onClick={() => console.log('Clicked on Report Symptoms')}
              tooltip="Report Symptoms"
              icon="fa fa-sticky-note"
            />
            <Link
              href="#"
              onClick={() => console.log('Clicked on Request Help')}
              tooltip="Request Help"
              icon="fa fa-sticky-note"
            />
            <Button
              className="fab-item btn btn-success btn-link btn-lg text-white"
              tooltip="Add"
              icon="fa fa-plus"
              rotate={false}
              styles={{ backgroundColor: '#368435', color: '#ffffff' }}
              onClick={() => {
              }}
            />
          </Container>
        </div>

        <div id="btn-extras-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <button className="btn btn-primary" onClick={this.toggleKeyInfoBar}>
            Key Info
          </button>
          <span className="d=block d-sm-none"><br /></span>
          <button className="btn btn-primary ml-0 ml-sm-3 mt-2 mt-sm-0" onClick={stateName ? this.toggleHelplineBar : noop}>
            Helpline Nos
          </button>
          {showKeyInfo &&
          <InfoCard cardType={InfoCard.cardTypes.KEY_INFO} />
          }
          {stateName && showStateHelplineNumber &&
          <InfoCard stateName={stateName} cardType={InfoCard.cardTypes.HELPLINE} />
          }
        </div>

        <div id="btn-select-container" className={classnames({ 'd-none': !isMapLoaded })}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">View</h5>

              <form>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rdoStatus"
                    id="rdoStatusConfirmed"
                    value="confirmed"
                    checked={status === 'confirmed'}
                    onChange={onStatusChanged}
                  />
                  <label className="form-check-label" htmlFor="rdoStatusConfirmed">
                    Confirmed Cases
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rdoStatus"
                    id="rdoStatusSymptoms"
                    value="symptoms"
                    checked={status === 'symptoms'}
                    onChange={onStatusChanged}
                  />
                  <label className="form-check-label" htmlFor="rdoStatusSymptoms">
                    Reported Cases
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MapControls.propTypes = {
  clearSearchBox: PropTypes.func.isRequired,
  isMapLoaded: PropTypes.bool.isRequired,
  mapCenter: PropTypes.object.isRequired,
  onStatusChanged: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default MapControls;
