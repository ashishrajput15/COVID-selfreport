import { cloneDeep } from 'lodash';

import {
  TOGGLE_REPORT_CASE,
  TOGGLE_REPORT_SYMPTOMS,
  TOGGLE_REQUEST_HELP,
  SET_REPORTER_DETAILS,
  SET_REPORTER_PERSON_STATE,
  SET_REPORTER_SYMPTOMS,
} from '../actions/actionTypes';

import initialState from './initialState'

export default function reportReducer(state = initialState.reportModals, action) {
  switch(action.type) {
    case TOGGLE_REPORT_CASE: {
      const newState = cloneDeep(state);
      newState.reportCaseModal = !state.reportCaseModal;
      return newState;
    }
    case TOGGLE_REPORT_SYMPTOMS: {
      const newState = cloneDeep(state);
      newState.reportSymptomsModal = !state.reportSymptomsModal;
      return newState;
    }
    case TOGGLE_REQUEST_HELP: {
      const newState = cloneDeep(state);
      newState.requestHelpModal = !state.requestHelpModal;
      return newState;
    }
    case SET_REPORTER_SYMPTOMS: {
      const newState = cloneDeep(state);
      newState.reportCaseStats.symptoms.cough = action.symptoms.cough;
      newState.reportCaseStats.symptoms.fever = action.symptoms.fever;
      newState.reportCaseStats.symptoms.sob = action.symptoms.sob;
      return newState;
    }
    case SET_REPORTER_PERSON_STATE: {
      const newState = cloneDeep(state);
      newState.reportCaseStats.myself = action.personState;
      return newState;
    }
    case SET_REPORTER_DETAILS: {
      const newState = cloneDeep(state);
      if (state.reportCaseStats.myself) {
        newState.generalStats.nameSelf = action.name;
        newState.generalStats.numberSelf = action.number;
      } else {
        newState.generalStats.nameOther = action.name;
        newState.generalStats.numberOther = action.number;
      }
      return newState;
    }
    default: {
      return state;
    }
  }
}
