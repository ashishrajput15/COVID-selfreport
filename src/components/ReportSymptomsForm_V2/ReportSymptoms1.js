import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import cough from '../../assets/cough.png';
import fever from '../../assets/fever.png';
import soreThroat from '../../assets/soreThroat.png';
import tired from '../../assets/tired.png';
import SymptomCard from './SymptomCard';

class ReportSymptoms5 extends React.Component {
  constructor(props) {
    super(props);

    this.onNext = this.onNext.bind(this);
    this.toggleCough = props.toggleSymptom.bind(null, 'Cough');
    this.toggleFever = props.toggleSymptom.bind(null, 'Fever');
    this.toggleSoreThroat = props.toggleSymptom.bind(null, 'Sore Throat');
    this.toggleTired = props.toggleSymptom.bind(null, 'Tired');
  }

  onNext() {
    const { jumpToStep, symptoms } = this.props;

    const selectedSymptoms = Object.keys(symptoms).filter(key => symptoms[key] === true);
    if (!selectedSymptoms.length) {
      alert('Please select the symptoms being faced to proceed.');
      return;
    }

    jumpToStep(2);
  }

  render() {
    const { jumpToStep, symptoms } = this.props;

    return (
      <div>
        <h5>What are the symptoms?</h5>
        <br />
        <Row>
          <SymptomCard
            image={cough}
            label={'Cough'}
            toggle={this.toggleCough}
            present={symptoms['Cough'] === true}
          />

          <SymptomCard
            image={fever}
            label={'Fever'}
            toggle={this.toggleFever}
            present={symptoms['Fever'] === true}
          />

          <SymptomCard
            image={soreThroat}
            label={'Sore Throat'}
            toggle={this.toggleSoreThroat}
            present={symptoms['Sore Throat'] === true}
          />

          <SymptomCard
            image={tired}
            label={'Tired'}
            toggle={this.toggleTired}
            present={symptoms['Tired'] === true}
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
                <i className="fa fa-times" />&nbsp;Cancel
              </Button>
            </Col>
            <Col xs={6} className="text-right">
              <Button color="primary" onClick={this.onNext}>
                <i className="fa fa-arrow-right" />&nbsp;Next
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
};

ReportSymptoms5.propTypes = {
  jumpToStep: PropTypes.func,
  toggleSymptom: PropTypes.func.isRequired,
  symptoms: PropTypes.object.isRequired,
};

export default ReportSymptoms5;
