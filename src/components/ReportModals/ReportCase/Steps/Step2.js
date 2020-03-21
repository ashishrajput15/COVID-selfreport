import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Stats from './Stats';

/**
 * @todo: add image to css file and then load the image from there
 */
const Step2 = (props) => (
    <Fragment>
      <div>
        <input type="checkbox" id="cough" name="cough" value="false" />
        <label htmlFor="cough">
          <div>
            <p>Cough</p>
            <img src="../../../../images/illustration-noresults.png" alt="cough"></img>
          </div>
        </label>
        <br />
        <hr />
        <input type="checkbox" id="fever" name="fever" value="false" />
        <label htmlFor="fever">
          <div>
            <p>Fever</p>
            <img src="../../../../images/illustration-noresults.png" alt="cough"></img>
          </div>
        </label>
        <br />
        <hr />
        <input type="checkbox" id="sob" name="shortnessOfBreath" value="false" />
        <label htmlFor="sob">
          <div>
            <p>Shortness of Breath</p>
            <img src="../../../../images/illustration-noresults.png" alt="cough"></img>
          </div>
        </label>
        <br />
        <hr />
      </div>
      <button className='btn btn-primary btn-block' onClick={props.nextStep}>Continue</button>
      <button className='btn btn-primary btn-block' onClick={props.previousStep}>Go Back</button>
      <Stats step={1} {...props}></Stats>
    </Fragment>
);

Step2.propTypes = {
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
}

export default Step2;
