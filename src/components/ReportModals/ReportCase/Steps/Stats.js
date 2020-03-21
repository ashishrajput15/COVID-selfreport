import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step,
}) => (
  <div>
      {/* <hr /> */}
      {/* { step > 1 &&
          <button className='btn btn-default btn-block' onClick={previousStep}>Go Back</button>
      }
      { step < totalSteps ?
          <button className='btn btn-primary btn-block' onClick={nextStep}>Continue</button>
          :
          <button className='btn btn-success btn-block' onClick={nextStep}>Finish</button>
      } */}
      <hr />
      <div style={{ fontSize: '21px', fontWeight: '200' }}>
          {/* <div>Current Step: {currentStep}</div>
          <div>Total Steps: {totalSteps}</div>
          <button className='btn btn-block btn-default' onClick={firstStep}>First Step</button> */}
          {/* <button className='btn btn-block btn-default' onClick={lastStep}>Last Step</button> */}
          <button className='btn btn-block btn-default' onClick={() => goToStep(1)}>Go to beginning</button>
      </div>
  </div>
);

Stats.propTypes = {
  currentStep: PropTypes.number,
  firstStep: PropTypes.func,
  goToStep: PropTypes.func,
  lastStep: PropTypes.func,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  totalSteps: PropTypes.number,
  step: PropTypes.number,
  children: PropTypes.node,
}

export default Stats;
