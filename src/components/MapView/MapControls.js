import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Container, Button, Link } from 'react-floating-action-button';
import { InfoCard } from "./InfoCard";

function noop() { }
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
    const { isMapLoaded } = this.props;
    const { stateName, showStateHelplineNumber, showKeyInfo } = this.state;
    return (
      <div>
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
          <button className="btn btn-primary" onClick={this.toggleKeyInfoBar}>
            Key Info
          </button>
          <button className="btn btn-primary ml-3" onClick={stateName ? this.toggleHelplineBar : noop}>
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
          <div className="form-group">
            <select defaultValue="confirmed" className="form-control" id="exampleFormControlSelect1">
              <option value="confirmed">Confirmed</option>
              <option value="symptoms">Symptoms</option>
              <option value="help_requests">Help Request</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

MapControls.propTypes = {
  isMapLoaded: PropTypes.bool.isRequired,
  mapCenter: PropTypes.object.isRequired,
};

export default MapControls;
