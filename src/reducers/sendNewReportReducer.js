import { cloneDeep } from 'lodash';
import {
  SEND_REPORT_STARTING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_ERROR,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function sendNewReportReducer(state = initialState.sendNewReport, action) {
  switch (action.type) {
    case SEND_REPORT_STARTING: {
      const newState = cloneDeep(state);
      newState.saving = true;
      newState.saved = false;
      return newState;
    }

    case SEND_REPORT_SUCCESS: {
      const { data } = action;
      const newState = cloneDeep(state);
      newState.saving = false;
      newState.saved = true;
      newState.reportData = data.report;
      return newState;
    }

    case SEND_REPORT_ERROR: {
      const newState = cloneDeep(state);
      newState.saving = false;
      newState.saved = false;
      newState.error = action.err ? action.err.message : 'Failed to send report.';
      return newState;
    }

    default: {
      return state;
    }
  }
}
