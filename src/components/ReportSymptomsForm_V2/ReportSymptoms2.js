import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reportsActions from '../../actions/reports';
import PickLocation from '../CommonUI/PickLocation';

class ReportSymptoms2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorAlertShown: false,

      symptoms: props.symptoms,
      numDays: props.numDays,

      markedLat: '',
      markedLng: '',
    };


    this.sendReportStarted = false;
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {   // eslint-disable-line react/no-deprecated
    if (this.props.sendNewReport !== nextProps.sendNewReport) {
      if (this.props.sendNewReport.saving !== nextProps.sendNewReport.saving) {
        this.handleToasts(nextProps);
      }
    }
  }

  handleToasts(props) {
    if (this.sendReportStarted) {
      const { sendNewReport } = props;
      if (!sendNewReport.saving && sendNewReport.saved) {
        this.sendReportStarted = false;
        this.props.jumpToStep(3);

        // Refresh Markers
        const { markedLat, markedLng } = this.state;
        this.props.actions.getReportsDataStarting();
        this.props.actions.getReportsData(markedLat, markedLng, 2000);
      } else if (!sendNewReport.saving && !sendNewReport.saved) {
        const errorMsg = sendNewReport.error ? sendNewReport.error :
          ('Your report could not be saved due to unforeseen errors. ' +
          'If this problem persists, please get in touch with us in our Telegram group.');

        alert(errorMsg);
        this.sendReportStarted = false;
      }
    }
  }

  setMarkedLatLng = (markedLat, markedLng) => {
    this.setState({markedLat, markedLng});
  }

  sendReport = (mapState) => {
    this.setMarkedLatLng(mapState.markedLat, mapState.markedLng);
    this.props.actions.sendReportStarting();
    this.props.actions.sendReport(Object.assign({}, this.state, mapState));
    this.sendReportStarted = true;
  }

  render() {
    const { jumpToStep, sendNewReport, mapCenter } = this.props;
    return (
      <PickLocation
        saving={sendNewReport.saving}
        goBackAction={() => jumpToStep(1)}
        confirmAction={(mapState) => this.sendReport(mapState)}
        mapCenter={mapCenter}
      />
    );
  }
}

ReportSymptoms2.defaultProps = {
  actions: {},
  jumpToStep: () => {
  },
  sendNewReport: {},
};

ReportSymptoms2.propTypes = {
  actions: PropTypes.object,
  jumpToStep: PropTypes.func,
  mapCenter: PropTypes.object.isRequired,
  numDays: PropTypes.string.isRequired,
  sendNewReport: PropTypes.object,
  symptoms: PropTypes.object.isRequired,
};

const mapStateToProps = (state => ({
  sendNewReport: state.sendNewReport,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, reportsActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(ReportSymptoms2);
