import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';

import { messages } from '../../../tools/messages';
import cough from '../../assets/cough.png';
import fever from '../../assets/fever.png';
import soreThroat from '../../assets/soreThroat.png';
import tired from '../../assets/tired.png';
import SymptomCard from '../CommonUI/SymptomCard';

class ReportSymptoms5 extends React.Component {
  constructor(props) {
    super(props);

    this.onNext = this.onNext.bind(this);
    this.toggleCough = props.toggleSymptom.bind(null, 'Cough');
    this.toggleFever = props.toggleSymptom.bind(null, 'Fever');
    this.toggleSoreThroat = props.toggleSymptom.bind(null, 'Sore Throat');
    this.toggleShortnessOfBreath = props.toggleSymptom.bind(null, 'Shortness of Breath');
  }

  onNext() {
    const { jumpToStep, symptoms, numDays } = this.props;

    if (!numDays) {
      alert('Please enter since how many days symptoms are being faced.');
      document.getElementById('txtNumDays').focus();
      return;
    }

    const selectedSymptoms = Object.keys(symptoms).filter(key => symptoms[key] === true);
    if (!selectedSymptoms.length) {
      alert('Please select symptoms.');
      return;
    }

    jumpToStep(2);
  }

  render() {
    const { jumpToStep, symptoms, numDays, onNumDaysChanged, intl } = this.props;

    return (
      <div>
        <h5>{intl.formatMessage(messages.firstSymptomQuestion)}</h5>

        <FormGroup className="mt-3">
          <Input
            autoComplete="off"
            type="number"
            placeholder=""
            name="numDays"
            id="txtNumDays"
            value={numDays}
            onChange={onNumDaysChanged}
          />
        </FormGroup>

        <h5>{intl.formatMessage(messages.whatAreTheSymptoms)}</h5>
        <br />
        <Row>
          <SymptomCard
            image={cough}
            label={intl.formatMessage(messages.cough)}
            toggle={this.toggleCough}
            present={symptoms['Cough'] === true}
          />

          <SymptomCard
            image={fever}
            label={intl.formatMessage(messages.fever)}
            toggle={this.toggleFever}
            present={symptoms['Fever'] === true}
          />

          <SymptomCard
            image={soreThroat}
            label={intl.formatMessage(messages.soreThroat)}
            toggle={this.toggleSoreThroat}
            present={symptoms['Sore Throat'] === true}
          />

          <SymptomCard
            image={tired}
            label={intl.formatMessage(messages.breathingDiff)}
            toggle={this.toggleShortnessOfBreath}
            present={symptoms['Shortness of Breath'] === true}
          />
        </Row>

        <div className="report-symptoms-modal-footer">
          <Row>
            <Col xs={6}>
              <Button
                color="light"
                onClick={() => {
                  jumpToStep(0);
                }}
              >
                <i className="fa fa-arrow-left" />&nbsp;{intl.formatMessage(messages.back)}
              </Button>
            </Col>
            <Col xs={6} className="text-right">
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

ReportSymptoms5.defaultProps = {
  jumpToStep: () => {
  },
  numDays: '',
};

ReportSymptoms5.propTypes = {
  jumpToStep: PropTypes.func,
  numDays: PropTypes.string.isRequired,
  onNumDaysChanged: PropTypes.func.isRequired,
  toggleSymptom: PropTypes.func.isRequired,
  symptoms: PropTypes.object.isRequired,
  intl: PropTypes.object.intl,
};

export default ReportSymptoms5;
