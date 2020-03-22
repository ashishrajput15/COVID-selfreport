import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class ReportSymptoms5 extends React.Component {
  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <p>In this page, show user whether they are suspected for COVID-19 or not.</p>

        <p>Your report has been saved successfully. We will get in touch with you soon to verify your report.</p>

        <br />

        <Button color="success" onClick={() => {
          jumpToStep(0);
        }}>
          <i className="fa fa-home" />&nbsp;Emergency Home
        </Button>
      </div>
    );
  }
}

ReportSymptoms5.defaultProps = {
  jumpToStep: () => {
  },
};

ReportSymptoms5.propTypes = {
  jumpToStep: PropTypes.func,
};

export default ReportSymptoms5;
