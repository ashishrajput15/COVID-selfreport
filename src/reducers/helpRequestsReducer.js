import { cloneDeep } from 'lodash';
import {
  GET_HELP_REQUESTS_STARTING,
  GET_HELP_REQUESTS_SUCCESS,
  GET_HELP_REQUESTS_ERROR,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function helpRequestsReducer(state = initialState.helpRequests, action) {
  switch (action.type) {
    case GET_HELP_REQUESTS_STARTING: {
      const newState = cloneDeep(state);
      newState.loading = true;
      newState.loaded = false;
      newState.ids = [];
      newState.map = {};
      newState.error = null;
      return newState;
    }

    case GET_HELP_REQUESTS_SUCCESS: {
      const { data } = action;
      const newState = cloneDeep(state);
      newState.loading = false;
      newState.loaded = true;

      data.helpRequests.forEach((p) => {
        newState.ids.push(p._id);
        newState.map[p._id] = p;
      });

      newState.error = null;
      return newState;
    }

    case GET_HELP_REQUESTS_ERROR: {
      const newState = cloneDeep(state);
      newState.loading = false;
      newState.loaded = false;
      newState.error = action.err ? action.err.message : 'Failed to retrieve reports data';
      return newState;
    }

    default: {
      return state;
    }
  }
}
