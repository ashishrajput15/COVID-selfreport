import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class ReportSymptoms5 extends React.Component {
  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <h5>What are your symptoms?</h5>
        <br />
        <div className="report-symptoms-options-container">
          <div>
            <input type="checkbox" id="cough" name="cough" value="false" />
            <label htmlFor="cough">
              <div>
                <h6>Cough</h6>
                <img src="../../images/cough.png" width="150" alt="cough"></img>
              </div>
            </label>
            <br />
          </div>
          <div>
            <input type="checkbox" id="fever" name="fever" value="false" />
            <label htmlFor="fever">
              <div>
                <h6>Fever</h6>
                <img src="../../images/fever.png" width="150" alt="Fever"></img>
              </div>
            </label>
            <br />
          </div>
          <div>
            <input type="checkbox" id="soreThroat" name="soreThroat" value="false" />
            <label htmlFor="soreThroat">
              <div>
                <h6>Sore Throat</h6>
                <img src="../../images/soreThroat.png" width="150" alt="Sore Throat"></img>
              </div>
            </label>
            <br />
          </div>
          <div>
            <input type="checkbox" id="tired" name="tired" value="false" />
            <label htmlFor="tired">
              <div>
                <h6>Tired</h6>
                <img src="../../images/tired.png" width="150" alt="Tired"></img>
              </div>
            </label>
            <br />
          </div>
        </div>

        <br />
        <div className="report-symptoms-modal-footer">
          <Button color="primary" onClick={() => {
            jumpToStep(4);
          }}>
            <i className="fa fa-arrow-left" />&nbsp;Back
          </Button>

          <Button color="primary" onClick={() => {
            jumpToStep(6);
          }}>
            <i className="fa fa-arrow-right" />&nbsp;Next
          </Button>
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
};

export default ReportSymptoms5;
