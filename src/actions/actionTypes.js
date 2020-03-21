export const GET_PATIENTS_DATA_STARTING = 'GET_PATIENTS_DATA_STARTING';
export const GET_PATIENTS_DATA_SUCCESS = 'GET_PATIENTS_DATA_SUCCESS';
export const GET_PATIENTS_DATA_ERROR = 'GET_PATIENTS_DATA_ERROR';


/** These are the action types for opening and
 * closing a modal when a report is to be made
 */
export const TOGGLE_REQUEST_HELP = 'TOGGLE_REQUEST_HELP';
export const TOGGLE_REPORT_CASE = 'TOGGLE_REPORT_CASE';
export const TOGGLE_REPORT_SYMPTOMS = 'TOGGLE_REPORT_SYMPTOMS';

// Person reporter state can be either 'myself' or 'some other person'
export const SET_REPORTER_PERSON_STATE = 'SET_REPORTER_PERSON_STATE';

// Person symptoms can be either one or more of cough, fever or shortness of breath
export const SET_REPORTER_SYMPTOMS = 'SET_REPORTER_SYMPTOMS';

// Personal details of either 'myself' or 'someother person'
export const SET_REPORTER_DETAILS = 'SET_REPORTER_DETAILS';
