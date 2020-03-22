import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class ReportSymptoms5 extends React.Component {
  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <p>What are your symptoms?</p>

        <br />

        <Button color="primary" onClick={() => {
          jumpToStep(6);
        }}>
          <i className="fa fa-arrow-right" />&nbsp;Next
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
