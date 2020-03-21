import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Container, Button, Link } from 'react-floating-action-button';
import { STATE_HELPLINE_NUMBERS } from "../../../tools/constants";
import Fuse from "fuse.js";

function noop() {
}


class MapControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateName: '',
      showStateHelplineNumber: false,
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

  parsedHelplineNum = state => {
    //const stateNames = Object.keys(STATE_HELPLINE_NUMBERS);
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

  toggleHelplineBar = () => {
    console.log('clicked on helpline bar');
    this.setState({
      showStateHelplineNumber: !this.state.showStateHelplineNumber,
    });
  }

  render() {
    const { isMapLoaded } = this.props;
    const { stateName, showStateHelplineNumber } = this.state;

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
          <button className="btn btn-primary">
            Key Info
          </button>

          <button className="btn btn-primary ml-3" onClick={stateName ? this.toggleHelplineBar : noop}>
            Helpline Nos
          </button>

          {stateName && showStateHelplineNumber &&
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Helpline number</h5>
              <h6 className="card-subtitle mb-2 text-muted">{stateName}</h6>
              <p className="card-text">
                {this.parsedHelplineNum(stateName)}
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
    )
  }
}

MapControls.propTypes = {
  isMapLoaded: PropTypes.bool.isRequired,
  mapCenter: PropTypes.object.isRequired,
};

export default MapControls;
