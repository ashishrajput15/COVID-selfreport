import {
  TOGGLE_REPORT_CASE,
  TOGGLE_REPORT_SYMPTOMS,
  TOGGLE_REQUEST_HELP,
  SET_REPORTER_DETAILS,
  SET_REPORTER_PERSON_STATE,
  SET_REPORTER_SYMPTOMS,
} from './actionTypes';

export const toggleReportCase = () => {
  return { type: TOGGLE_REPORT_CASE};
};

export const toggleReportSymptoms = () => {
  return { type: TOGGLE_REPORT_SYMPTOMS};
};

export const toggleRequestHelp = () => {
  return { type: TOGGLE_REQUEST_HELP};
};

// Person reporter state can be either 'myself' or 'some other person'
/**
 *
 * @param {Boolean} personState
 */
export const setReporterState = (personState) => {
  return {type: SET_REPORTER_PERSON_STATE, personState};
}

// Person symptoms can be either one or more of cough, fever or shortness of breath
/**
 *
 * @param {Object} symptoms
 * @param {Boolean} symptoms.cough
 * @param {Boolean} symptoms.fever
 * @param {Boolean} symptoms.sob
 */
export const setReporterSymptoms = (symptoms) => {
  return {type: SET_REPORTER_SYMPTOMS, symptoms};
}

// Personal details of either 'myself' or 'someother person'
/**
 *
 * @param {String} name
 * @param {String} number
 */
export const setReporterDetails = (name, number) => {
  return {type: SET_REPORTER_DETAILS, name, number};
}
