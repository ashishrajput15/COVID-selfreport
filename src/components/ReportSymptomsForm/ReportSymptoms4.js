import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class ReportSymptoms4 extends React.Component {
  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <p>Do you have travel history to affected country?</p>

        <p>Come in contact with any patient?</p>

        <br />

        <Button color="primary" onClick={() => {
          jumpToStep(5);
        }}>
          <i className="fa fa-arrow-right" />&nbsp;Next
        </Button>
      </div>
    );
  }
}

ReportSymptoms4.defaultProps = {
  jumpToStep: () => {
  },
};

ReportSymptoms4.propTypes = {
  jumpToStep: PropTypes.func,
};

export default ReportSymptoms4;
