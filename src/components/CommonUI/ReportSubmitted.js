import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HelplineInfoCard } from '../MapView/InfoCard';

class ReportSubmitted extends React.Component {
  render() {
    const { toggleModal, sendNewReport, sendNewReqHelp, modalType } = this.props;

    let stateName = '';
    if (modalType === 'report_symptoms') {
      stateName = (sendNewReport.reportData && sendNewReport.reportData.state) ? sendNewReport.reportData.state : '';
    } else if (modalType === 'request_help') {
      stateName = (sendNewReqHelp.helpRequestData && sendNewReqHelp.helpRequestData.state) ? sendNewReqHelp.helpRequestData.state : '';
    }

    return (
      <div className="report-submitted">
        <h5>Thank You!</h5>
        <br />

        <p>Your information will help us fight community spread.</p>

        <p className="mb-4">Please reach out to Helpline Numbers shown below.</p>

        <HelplineInfoCard
          stateName={stateName}
          toggle={null}
        />

        <Button color="secondary" onClick={toggleModal}>
          Close
        </Button>
      </div>
    );
  }
}

ReportSubmitted.defaultProps = {
  jumpToStep: () => {
  },
  sendNewReport: {},
  sendNewReqHelp: {},
};

ReportSubmitted.propTypes = {
  jumpToStep: PropTypes.func,
  modalType: PropTypes.string.isRequired,
  sendNewReport: PropTypes.object,
  sendNewReqHelp: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state => ({
  sendNewReport: state.sendNewReport,
  sendNewReqHelp: state.sendNewReqHelp,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(ReportSubmitted);
