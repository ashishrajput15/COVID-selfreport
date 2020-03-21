import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step4 from './Steps/Step4';

import transitions from './transitionStyles.scss';

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
    });

    // @todo: Do something on step change
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
                            <Step2
                              hashKey={'StepTwo'}
                            />
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
        </div>
    );
};

export default Wizard;

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
