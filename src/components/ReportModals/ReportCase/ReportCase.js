import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step4 from './Steps/Step4';

import transitions from './transitionStyles.scss';
/* eslint react/prop-types: 0 */

/**
 * A basic demonstration of how to use the step wizard
 */
const Wizard = (props) => {
    const [state, updateState] = useState({
        form: {},
        transitions: {
            enterRight: `${transitions.reportersAnimated} ${transitions.reportersEnterRight}`,
            enterLeft: `${transitions.reportersAnimated} ${transitions.reportersEnterLeft}`,
            exitRight: `${transitions.reportersAnimated} ${transitions.reportersExitRight}`,
            exitLeft: `${transitions.reportersAnimated} ${transitions.reportersExitLeft}`,
            intro: `${transitions.reportersAnimated} ${transitions.reporterIntro}`,
        },
        myself: true,
        // demo: true, // uncomment to see more
    });

    // Do something on step change
    const onStepChange = (stats) => {
        // console.log(stats);
    };

    const updateForm = (key, value) => {
      const { form } = state;

      form[key] = value;
      updateState({
          ...state,
          form,
      });
    };

    const setInstance = SW => updateState({
        ...state,
        SW,
    });

    const { SW, demo } = state;

    return (
        <div className='container'>
            <h3>Report Case</h3>
            <div className={'jumbotron'}>
                <div className='row'>
                    <div className={'reporter-rsw-wrapper'}>
                        <StepWizard
                            onStepChange={onStepChange}
                            isHashEnabled
                            transitions={state.transitions} // comment out for default transitions
                            instance={setInstance}
                        >
                            <Step1
                              setReporterState={(val) => {
                                props.reporterActions.reporterState(val);
                                updateState({...state, myself: val});
                              }}
                              hashKey={'FirstStep'}
                            />
                            {/* <Second form={state.form} /> */}
                            <Step2 hashKey={'StepTwo'}></Step2>
                            <Progress />
                            <Step4
                              myself={state.myself}
                              updateForm={updateForm}
                              hashKey={'StepFour'}
                            />
                        </StepWizard>
                    </div>
                </div>
            </div>
            { (demo && SW) && <InstanceDemo SW={SW} /> }
        </div>
    );
};

export default Wizard;

/** Demo of using instance */
const InstanceDemo = ({ SW }) => (
    <Fragment>
        <h4>Control from outside component</h4>
        <button className={'btn btn-secondary'} onClick={SW.previousStep}>Previous Step</button>
        &nbsp;
        <button className={'btn btn-secondary'} onClick={SW.nextStep}>Next Step</button>
    </Fragment>
);

/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */
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
        <hr />
        { step > 1 &&
            <button className='btn btn-default btn-block' onClick={previousStep}>Go Back</button>
        }
        { step < totalSteps ?
            <button className='btn btn-primary btn-block' onClick={nextStep}>Continue</button>
            :
            <button className='btn btn-success btn-block' onClick={nextStep}>Finish</button>
        }
        <hr />
        <div style={{ fontSize: '21px', fontWeight: '200' }}>
            <h4>Other Functions</h4>
            <div>Current Step: {currentStep}</div>
            <div>Total Steps: {totalSteps}</div>
            <button className='btn btn-block btn-default' onClick={firstStep}>First Step</button>
            <button className='btn btn-block btn-default' onClick={lastStep}>Last Step</button>
            <button className='btn btn-block btn-default' onClick={() => goToStep(2)}>Go to Step 2</button>
        </div>
    </div>
);

/** Steps */

const Progress = (props) => {
    const [state, updateState] = useState({
        isActiveClass: '',
        timeout: null,
    });

    useEffect(() => {
        const { timeout } = state;

        if (props.isActive && !timeout) {
            updateState({
                isActiveClass: true,
                timeout: setTimeout(() => {
                    props.nextStep();
                }, 3000),
            });
        } else if (!props.isActive && timeout) {
            clearTimeout(timeout);
            updateState({
                isActiveClass: '',
                timeout: null,
            });
        }
    });

    return (
        <div className={'reporter-progress-wrapper'}>
            <p className='text-center'>Automated Progress...</p>
            <div className={classNames({'reporter-progress': true, 'reporter-loaded': true})}>
                <div className={classNames({'reporter-progress-bar': true, 'reptorter-progress-bar-striped': true})} />
            </div>
        </div>
    );
};

Wizard.propTypes = {
  reporterActions: PropTypes.object.isRequired,
}
