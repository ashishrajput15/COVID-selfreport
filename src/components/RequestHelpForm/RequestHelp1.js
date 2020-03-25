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

      helpRequest: props.helpRequests,
      detailRequest: props.detailRequest,
    }

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
    console.log('handling request help toasts');
    if (this.sendRequestHelpStarted) {
      const { sendNewReqHelp } = props;
      if (!sendNewReqHelp.saving && sendNewReqHelp.saved) {
        this.sendRequestHelpStarted = false;
        this.props.jumpToStep(2);
      }
    }
  }

  sendRequestHelp = (mapState) => {
    this.props.actions.sendRequestHelpStarting();
    this.props.actions.sendRequestHelp(Object.assign({}, this.state, mapState));
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
