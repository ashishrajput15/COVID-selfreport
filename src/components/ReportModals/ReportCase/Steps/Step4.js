import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Stats from './Stats';

const Step4 = (props) => {
  const update = (e) => {
    props.updateForm(e.target.name, e.target.value);
  };
  return (
    <Fragment>
      <div>
        <p>{props.myself ? 'You' : 'The person'} may have Corona Virus</p><br />
        <p>Please enter {props.myself ? 'your' : 'the person\'s'} name and phone number.</p>
      </div>
      <label>Name</label>
      <input type='text' className='form-control' name='name' placeholder='First Name'
          onChange={update}
      />
      <label>Phone Number</label>
      <input type='text' className='form-control' name='number' placeholder='Phone Number'
          onChange={update}
      />
      <hr />
      {props.myself ?
        (<button className='btn btn-primary btn-block' onClick={props.nextStep}>Send OTP</button>)
        : (
        <button className='btn btn-primary btn-block' onClick={props.nextStep}>Send Details</button>
        )
      }
      <button className='btn btn-primary btn-block' onClick={() => props.goToStep(2)}>Go Back to Symptoms</button>
    </Fragment>
  );
};

Step4.propTypes = {
  nextStep: PropTypes.func,
  updateForm: PropTypes.func,
  myself: PropTypes.bool,
  goToStep: PropTypes.func,
}

export default Step4;
