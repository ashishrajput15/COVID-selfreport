import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CardRow, parsedHelplineNum } from '../MapView/InfoCard';
import { HELPLINE_CONTENT } from "../../../tools/constants";

class ReportSubmitted extends React.Component {
  render() {
    const { toggleModal, sendNewReport } = this.props;

    const stateName = (sendNewReport.reportData && sendNewReport.reportData.state) ? sendNewReport.reportData.state : '';

    return (
      <div className="report-submitted">
        <h5>Thank You!</h5>
        <br />

        <p>Your information will help us fight community spread.</p>

        <p className="mb-4">Please reach out to Helpline Numbers shown below.</p>

        {stateName && (
          <CardRow heading={stateName} subHeading={parsedHelplineNum(stateName)} linked={false} />
        )}

        {HELPLINE_CONTENT.map(({ heading, subHeading }) =>
          <CardRow heading={heading} subHeading={subHeading} key={subHeading} linked={false} />
        )}

        <Button color="secondary" onClick={toggleModal}>
          <i className="fa fa-times" />&nbsp;Close
        </Button>
      </div>
    );
  }
}

ReportSubmitted.defaultProps = {
  jumpToStep: () => {
  },
  sendNewReport: {},
};

ReportSubmitted.propTypes = {
  jumpToStep: PropTypes.func,
  sendNewReport: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state => ({
  sendNewReport: state.sendNewReport,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(ReportSubmitted);
