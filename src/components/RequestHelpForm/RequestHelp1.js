import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as requestHelpActions from '../../actions/requestHelp';
import PickLocation from '../CommonUI/PickLocation';

class RequestHelp1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorAlertShown: false,

      requestedItems: props.helpRequests,
      requestDetails: props.detailRequest,

      stateName: '',
    };

    this.sendRequestHelpStarted = false;
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {   // eslint-disable-line react/no-deprecated
    if (this.props.sendNewReqHelp !== nextProps.sendNewReqHelp) {
      if (this.props.sendNewReqHelp.saving !== nextProps.sendNewReqHelp.saving) {
        this.handleToasts(nextProps);
      }
    }
  }

  handleToasts(props) {
    const { stateName } = this.state;
    if (this.sendRequestHelpStarted) {
      const { sendNewReqHelp } = props;
      if (!sendNewReqHelp.saving && sendNewReqHelp.saved) {
        this.sendRequestHelpStarted = false;
        this.props.jumpToStep(2);

        // Refresh Markers
        this.props.actions.getHelpRequestsStarting();
        this.props.actions.getHelpRequests(stateName, 23.259933, 77.412613, 2000);
      } else if (!sendNewReqHelp.saving && !sendNewReqHelp.saved) {
        const errorMsg = sendNewReqHelp.error ? sendNewReqHelp.error :
          ('Your report could not be saved due to unforeseen errors. ' +
          'If this problem persists, please get in touch with us in our Telegram group.');

        alert(errorMsg);
        this.sendRequestHelpStarted = false;
      }
    }
  }

  setState = (stateName) => {
    this.setState({stateName})
  }

  sendRequestHelp = (mapState) => {
    this.setState(mapState.state);
    this.props.actions.sendRequestHelpStarting();
    this.props.actions.sendRequestHelp(mapState.state, Object.assign({}, this.state, mapState));
    this.sendRequestHelpStarted = true;
  }


  render() {
    const { jumpToStep, sendNewReqHelp, mapCenter } = this.props;

    return (
      <PickLocation
        goBackAction={() => jumpToStep(0)}
        saving={sendNewReqHelp.saving}
        confirmAction={(curState) => {
          this.sendRequestHelp(curState)
        }}
        mapCenter={mapCenter}
      />
    );
  }
}

RequestHelp1.defaultProps = {
  actions: {},
  jumpToStep: () => {
  },
  sendNewReqHelp: {},
};

RequestHelp1.propTypes = {
  actions: PropTypes.object,
  jumpToStep: PropTypes.func,
  mapCenter: PropTypes.object.isRequired,
  detailRequest: PropTypes.string.isRequired,
  sendNewReqHelp: PropTypes.object,
  helpRequests: PropTypes.object.isRequired,
};

const mapStateToProps = (state => ({
  sendNewReqHelp: state.sendNewReqHelp,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, requestHelpActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(RequestHelp1);
