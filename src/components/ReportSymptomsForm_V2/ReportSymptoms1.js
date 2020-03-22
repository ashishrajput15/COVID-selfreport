import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import cough from '../../assets/cough.png';
import fever from '../../assets/fever.png';
import soreThroat from '../../assets/soreThroat.png';
import tired from '../../assets/tired.png';

class ReportSymptoms5 extends React.Component {
  constructor(props) {
    super(props);

    this.setCough = props.setSymptom.bind(null, 'Cough');
    this.setFever = props.setSymptom.bind(null, 'Fever');
    this.setSoreThroat = props.setSymptom.bind(null, 'Sore Throat');
    this.setTired = props.setSymptom.bind(null, 'Tired');
  }

  render() {
    const { jumpToStep, symptoms } = this.props;

    return (
      <div>
        <h5>What are your symptoms?</h5>
        <br />
        <div className="report-symptoms-options-container">
          <div>
            <input
              type="checkbox"
              id="cough"
              name="cough"
              checked={symptoms['Cough'] === true}
              onChange={this.setCough}
            />
            <label htmlFor="cough">
              <div>
                <h6>Cough</h6>
                <img src={cough} width="150" alt="cough" />
              </div>
            </label>
            <br />
          </div>
          <div>
            <input
              type="checkbox" id="fever" name="fever"
              checked={symptoms['Fever'] === true}
              onChange={this.setFever}
            />
            <label htmlFor="fever">
              <div>
                <h6>Fever</h6>
                <img src={fever} width="150" alt="fever" />
              </div>
            </label>
            <br />
          </div>
          <div>
            <input
              type="checkbox" id="soreThroat" name="soreThroat" value="false"
              checked={symptoms['Sore Throat'] === true}
              onChange={this.setSoreThroat}
            />
            <label htmlFor="soreThroat">
              <div>
                <h6>Sore Throat</h6>
                <img src={soreThroat} width="150" alt="sorethroat" />
              </div>
            </label>
            <br />
          </div>
          <div>
            <input
              type="checkbox" id="tired" name="tired" value="false"
              checked={symptoms['Tired'] === true}
              onChange={this.setTired}
            />
            <label htmlFor="tired">
              <div>
                <h6>Tired</h6>
                <img src={tired} width="150" alt="Tired" />
              </div>
            </label>
            <br />
          </div>
        </div>

        <br />
        <div className="report-symptoms-modal-footer">
          <Row>
            <Col xs={6}>
              <Button color="light" onClick={() => {
                jumpToStep(0);
              }}>
                <i className="fa fa-arrow-left" />&nbsp;Back
              </Button>
            </Col>

            <Col xs={6} className="text-right">
              <Button color="primary" onClick={() => {
                jumpToStep(2);
              }}>
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
  setSymptom: PropTypes.func.isRequired,
  symptoms: PropTypes.object.isRequired,
};

export default ReportSymptoms5;
