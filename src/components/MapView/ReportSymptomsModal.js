import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, Form, Modal, ModalBody, ModalFooter,
  ModalHeader
} from 'reactstrap';
import * as reportsActions from '../../actions/reportsActions';
import StepZilla from 'react-stepzilla';
import Intro from '../ReportSymptomsForm/Intro';
import ReportSymptoms1 from '../ReportSymptomsForm/ReportSymptoms1';
import ReportSymptoms2 from '../ReportSymptomsForm/ReportSymptoms2';
import ReportSymptoms3 from '../ReportSymptomsForm/ReportSymptoms3';
import ReportSymptoms5 from '../ReportSymptomsForm/ReportSymptoms5';
import ReportSymptoms4 from '../ReportSymptomsForm/ReportSymptoms4';
import ReportSymptoms6 from '../ReportSymptomsForm/ReportSymptoms6';

class ReportSymptomsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const popup = document.getElementsByClassName('report-symptoms-modal')[0];
    if (popup) {
      const input = popup.getElementsByTagName('input')[0];

      if (input) {
        input.focus();
      }
    }
  }

  componentWillReceiveProps(/* nextProps */) { // eslint-disable-line react/no-deprecated

  }

  render() {
    const { toggleHelplineBar, toggleKeyInfoBar } = this.props;
    const { saving } = { saving: false }; // reportSymptoms;

    let content;
    if (saving) {
      content = (
        <div className="text-center" style={{ marginTop: '10px' }}>
          <i className="fa fa-2x fa-spin fa-spinner" />
        </div>
      );
    } else {
      // Show simple form
      const steps = [
        { name: 'Intro', component: (<Intro toggleHelplineBar={toggleHelplineBar} toggleKeyInfoBar={toggleKeyInfoBar} />) },
        { name: 'ReportSymptoms1', component: (<ReportSymptoms1 />) },
        { name: 'ReportSymptoms2', component: (<ReportSymptoms2 />) },
        { name: 'ReportSymptoms3', component: (<ReportSymptoms3 />) },
        { name: 'ReportSymptoms4', component: (<ReportSymptoms4 />) },
        { name: 'ReportSymptoms5', component: (<ReportSymptoms5 />) },
        { name: 'ReportSymptoms6', component: (<ReportSymptoms6 />) },
      ];

      content = (
        <Form autoComplete="off" action="" method="post" onSubmit={() => {
        }}>
          <div className='step-progress'>
            <StepZilla
              steps={steps}
              showNavigation={false}
              showSteps={false}
              stepsNavigation={false}
            />
          </div>
        </Form>
      );
    }

    return (
      <Modal isOpen={true} toggle={this.props.toggleModal} className="report-symptoms-modal">
        <ModalHeader toggle={this.props.toggleModal} className="text-danger">
          <i className="fa fa-exclamation-triangle" />
          {' '}
          Emergency
        </ModalHeader>

        <ModalBody>
          {content}
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggleModal}>
            Close
            &nbsp;
            <i className="fa fa-times" />
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ReportSymptomsModal.defaultProps = {
  actions: {},
  reportSymptoms: {},
};

ReportSymptomsModal.propTypes = {
  actions: PropTypes.object,
  reportSymptoms: PropTypes.object,
  toggleHelplineBar: PropTypes.func.isRequired,
  toggleKeyInfoBar: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state => ({
  reportSymptoms: state.reportSymptoms,
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, reportsActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(ReportSymptomsModal);
