import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class ReportSymptoms2 extends React.Component {
  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <p>Mark your location on the map</p>

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
};

export default ReportSymptoms2;
