import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

/**
 * @todo: add image to css file and then load the image from there
 */
const Step2 = (props) => (
    <Fragment>
      <div>
        <div className="symptomContainer">
          <input type="checkbox" id="cough" name="cough" value="false" />
          <label htmlFor="cough">
            <div className="symptom">
              <img src="../../../../images/illustration-noresults.png" alt="cough"></img>
              <p>Cough</p>
            </div>
          </label>
          <br />
          <hr />
        </div>
        <div className="symptomContainer">
          <input type="checkbox" id="fever" name="fever" value="false" />
          <label htmlFor="fever">
            <div className="symptom">
              <img src="../../../../images/illustration-noresults.png" alt="cough"></img>
              <p>Fever</p>
            </div>
          </label>
          <br />
          <hr />
        </div>
        <div className="symptomContainer">
          <input type="checkbox" id="sob" name="shortnessOfBreath" value="false" />
          <label htmlFor="sob">
            <div className="symptom">
              <img src="../../../../images/illustration-noresults.png" alt="cough"></img>
              <p>Shortness of Breath</p>
            </div>
          </label>
          <br />
          <hr />
        </div>
      </div>
      <button className='btn btn-primary btn-block' onClick={props.nextStep}>Continue</button>
      <button className='btn btn-primary btn-block' onClick={props.previousStep}>Go Back</button>
    </Fragment>
);

Step2.propTypes = {
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
}

export default Step2;
