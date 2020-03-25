import { cloneDeep } from 'lodash';
import {
  SEND_REQUEST_HELP_STARTING,
  SEND_REQUEST_HELP_SUCCESS,
  SEND_REQUEST_HELP_ERROR,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function sendNewReqHelp(state = initialState.sendNewRequestHelp, action) {
  switch (action.type) {
    case SEND_REQUEST_HELP_STARTING: {
      const newState = cloneDeep(state);
      newState.saving = true;
      newState.saved = false;
      return newState;
    }

    case SEND_REQUEST_HELP_SUCCESS: {
      const { data } = action;
      const newState = cloneDeep(state);
      newState.saving = false;
      newState.saved = true;
      newState.reqHelpData = data.report;
      return newState;
    }

    case SEND_REQUEST_HELP_ERROR: {
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
