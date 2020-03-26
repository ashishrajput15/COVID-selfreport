import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Form, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import * as requestHelp from '../../actions/requestHelp';
import StepZilla from 'react-stepzilla';
import Intro from '../RequestHelpForm/Intro';
import RequestHelp1 from '../RequestHelpForm/RequestHelp1';
import ReportSubmitted from '../CommonUI/ReportSubmitted';

class RequestHelpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpRequests: {
        'Masks': false,
        'PPE': false,
        'Medicines': false,
        'Sanitizer': false,
        'Medical Help': false,
      },

      detailRequest: '',
    };

    this.onDetailRequestChanged = this.onDetailRequestChanged.bind(this);
    this.toggleReqHelp = this.toggleReqHelp.bind(this);
  }

  componentDidMount() {
    const popup = document.getElementsByClassName('request-help-modal')[0];
    if (popup) {
      const input = popup.getElementsByTagName('input')[0];

      if (input) {
        input.focus();
      }
    }
  }

  componentWillReceiveProps(/* nextProps */) { // eslint-disable-line react/no-deprecated

  }

  toggleReqHelp(name) {
    const { helpRequests } = this.state;

    // Toggle symptom value
    let value = helpRequests[name];
    value = value !== true;
    helpRequests[name] = value;

    this.setState({
      helpRequests,
    });
  }

  onDetailRequestChanged(event) {
    this.setState({
      detailRequest: event.target.value,
    });
  }

  render() {
    const { toggleModal, mapCenter, intl } = this.props;
    const { helpRequests, detailRequest } = this.state;

    // Show simple form
    const steps = [{
      name: 'Intro',
      component: (
        <Intro
          helpRequests={helpRequests}
          detailRequest={detailRequest}
          onDetailRequestChanged={this.onDetailRequestChanged}
          toggleReqHelp={this.toggleReqHelp}
        />
      )
    }, {
      name: 'RequestHelp',
      component: (
        <RequestHelp1
          intl={intl}
          mapCenter={mapCenter}
          helpRequests={helpRequests}
          detailRequest={detailRequest}
        />
      ),
    }, {
      name: 'ReportSubmitted',
      component: (
        <ReportSubmitted
          modalType="request_help"
          toggleModal={toggleModal}
        />
      ),
    }];

    return (
      <Modal isOpen={true} toggle={this.props.toggleModal} className="request-help-modal" backdrop="static">
        <ModalHeader toggle={this.props.toggleModal} className="text-danger">
          Help India Fight Corona
        </ModalHeader>

        <ModalBody className="pb-4">
          <Form autoComplete="off" action="" method="post" onSubmit={() => {
          }}>
            <div className='step-progress'>
              <StepZilla
                steps={steps}
                showNavigation={false}
                showSteps={false}
                stepsNavigation={false}
                startAtStep={0}
              />
            </div>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

RequestHelpModal.defaultProps = {
  actions: {},
  reportReqHelp: {},
};

RequestHelpModal.propTypes = {
  actions: PropTypes.object,
  mapCenter: PropTypes.object.isRequired,
  reportReqHelp: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
  intl: PropTypes.object
};

const mapStateToProps = (state => ({
  reportReqHelp: state.reportReqHelp,
  intl: state.language.intl
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, requestHelp),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(RequestHelpModal);
