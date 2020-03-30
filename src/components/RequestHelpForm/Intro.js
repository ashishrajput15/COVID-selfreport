import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import medicines from '../../assets/medicines.jpg';
import ppe from '../../assets/ppe.jpg';
import medicalHelp from '../../assets/medicalHelp.png';
import surgicalMask from '../../assets/surgicalMask.jpg';
import sanitizer from '../../assets/sanitizer.jpg';
import SymptomCard from '../CommonUI/SymptomCard';
import { messages } from '../../../tools/messages';

class RequestHelp extends React.Component {
  constructor(props) {
    super(props);

    this.onNext = this.onNext.bind(this);
    this.toggleMedicines = props.toggleReqHelp.bind(null, 'Medicines');
    this.togglePPE = props.toggleReqHelp.bind(null, 'PPE');
    this.toggleMasks = props.toggleReqHelp.bind(null, 'Masks');
    this.toggleSanitizer = props.toggleReqHelp.bind(null, 'Sanitizer');
    this.toggleMedicalHelp = props.toggleReqHelp.bind(null, 'Medical Help');
  }

  onNext() {
    const { jumpToStep, helpRequests, detailRequest } = this.props;

    if (detailRequest === '') {
      alert('Please write in detail about your request ? No of people and quantity required.');
      document.getElementById('detailRequest').focus();
      return;
    }

    const selectedHelpRequest = Object.keys(helpRequests).filter(key => helpRequests[key] === true);
    if (!selectedHelpRequest.length) {
      alert('Please select what help you require.');
      return;
    }

    jumpToStep(1);
  }

  render() {
    const { helpRequests, onDetailRequestChanged, intl } = this.props;

    return (
      <div>
        {/* <h5>What help do you need?</h5> */}

        {/* <h5>{intl.formatMessage(messages.whatEquipmentRequired)}</h5> */}
        <br />
        <Row>
          <SymptomCard
            image={medicalHelp}
            label={intl.formatMessage(messages.medicalHelp)}
            toggle={this.toggleMedicalHelp}
            present={helpRequests['Medical Help'] === true}
          />

          <SymptomCard
            image={surgicalMask}
            label={intl.formatMessage(messages.surgicalMasks)}
            toggle={this.toggleMasks}
            present={helpRequests['Masks'] === true}
          />

          <SymptomCard
            image={sanitizer}
            label={intl.formatMessage(messages.sanitizer)}
            toggle={this.toggleSanitizer}
            present={helpRequests['Sanitizer'] === true}
          />

          <SymptomCard
            image={ppe}
            label={intl.formatMessage(messages.ppe)}
            toggle={this.togglePPE}
            present={helpRequests['PPE'] === true}
          />

          <SymptomCard
            image={medicines}
            label={intl.formatMessage(messages.medicines)}
            toggle={this.toggleMedicines}
            present={helpRequests['Medicines'] === true}
          />


        </Row>

        <FormGroup className="mt-3">
          <h5>
            {intl.formatMessage(messages.writeDetailRequest)}
          </h5>
          <Input
            type="text"
            name="detailRequest"
            id="detailRequest"
            onChange={(e) => {
              onDetailRequestChanged(e);
            }}
          />
        </FormGroup>

        <div className="report-symptoms-modal-footer">
          <Row>
            <Col xs={12} className="text-right">
              <Button color="primary" onClick={this.onNext}>
                <i className="fa fa-arrow-right" />&nbsp;{intl.formatMessage(messages.next)}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

RequestHelp.defaultProps = {
  jumpToStep: () => {
  },
  detailRequest: '',
};

RequestHelp.propTypes = {
  jumpToStep: PropTypes.func,
  detailRequest: PropTypes.string.isRequired,
  onDetailRequestChanged: PropTypes.func.isRequired,
  toggleReqHelp: PropTypes.func.isRequired,
  helpRequests: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default RequestHelp;
