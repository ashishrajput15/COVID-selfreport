import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Form, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import * as reportsActions from '../../actions/reports';
import StepZilla from 'react-stepzilla';
import Intro from '../ReportSymptomsForm_V2/Intro';
import ReportSymptoms1 from '../ReportSymptomsForm_V2/ReportSymptoms1';
import ReportSymptoms2 from '../ReportSymptomsForm_V2/ReportSymptoms2';
import ReportSubmitted from '../ReportSymptomsForm_V2/ReportSubmitted';

class ReportSymptomsModal_V2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symptoms: {
        'Cough': false,
        'Fever': false,
        'Sore Throat': false,
        'Shortness of Breath': false,
      },

      numDays: '',
    };

    this.onNumDaysChanged = this.onNumDaysChanged.bind(this);
    this.toggleSymptom = this.toggleSymptom.bind(this);
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

  toggleSymptom(name) {
    const { symptoms } = this.state;

    // Toggle symptom value
    let value = symptoms[name];
    value = value !== true;
    symptoms[name] = value;

    this.setState({
      symptoms,
    });
  }

  onNumDaysChanged(event) {
    this.setState({
      numDays: event.target.value,
    });
  }

  render() {
    const { mapCenter, toggleHelplineBar, toggleKeyInfoBar, toggleModal } = this.props;
    const { symptoms, numDays } = this.state;

    // Show simple form
    const steps = [
      {
        name: 'Intro',
        component: (
          <Intro
            toggleHelplineBar={toggleHelplineBar}
            toggleKeyInfoBar={toggleKeyInfoBar}
            toggleModal={toggleModal}
          />
        )
      },
      {
        name: 'ReportSymptoms1', component: (
        <ReportSymptoms1
          symptoms={symptoms}
          numDays={numDays}
          onNumDaysChanged={this.onNumDaysChanged}
          toggleSymptom={this.toggleSymptom}
        />
      )
      },
      { name: 'ReportSymptoms2', component: (
        <ReportSymptoms2
          mapCenter={mapCenter}
          symptoms={symptoms}
          numDays={numDays}
        />
      ) },
      { name: 'ReportSubmitted', component: (<ReportSubmitted toggleModal={toggleModal} />) },
    ];

    return (
      <Modal isOpen={true} toggle={this.props.toggleModal} className="report-symptoms-modal" backdrop="static">
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

        {/*<ModalFooter>*/}
        {/*<Button color="secondary" onClick={this.props.toggleModal}>*/}
        {/*Close*/}
        {/*&nbsp;*/}
        {/*<i className="fa fa-times" />*/}
        {/*</Button>*/}
        {/*</ModalFooter>*/}
      </Modal>
    )
  }
}

ReportSymptomsModal_V2.defaultProps = {
  actions: {},
  reportSymptoms: {},
};

ReportSymptomsModal_V2.propTypes = {
  actions: PropTypes.object,
  mapCenter: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportSymptomsModal_V2);
