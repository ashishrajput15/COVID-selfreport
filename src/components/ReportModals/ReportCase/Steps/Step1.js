import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Step1 = (props) => (
    <Fragment>
      <button
        className='btn btn-primary btn-block'
        onClick={() => {
          props.setReporterState(true);
          props.nextStep();
        }}>
          Report Myself
      </button>
      <button
        className='btn btn-primary btn-block'
        onClick={() => {
          props.setReporterState(false);
          props.nextStep();
        }}>
          Report someone else
       </button>
    </Fragment>
);

Step1.propTypes = {
  nextStep: PropTypes.func,
  setReporterState: PropTypes.func,
}

export default Step1;
