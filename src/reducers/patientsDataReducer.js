import { cloneDeep } from 'lodash';
import {
  GET_PATIENTS_DATA_STARTING,
  GET_PATIENTS_DATA_SUCCESS,
  GET_PATIENTS_DATA_ERROR,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function patientsDataReducer(state = initialState.patientsData, action) {
  switch (action.type) {
    case GET_PATIENTS_DATA_STARTING: {
      const newState = cloneDeep(state);
      newState.loading = true;
      newState.loaded = false;
      newState.ids = [];
      newState.map = {};
      newState.error = null;
      return newState;
    }

    case GET_PATIENTS_DATA_SUCCESS: {
      const { data } = action;
      const newState = cloneDeep(state);
      newState.loading = false;
      newState.loaded = true;

      data.patients.forEach((p) => {
        newState.ids.push(p._id);
        newState.map[p._id] = p;
      });

      newState.error = null;
      return newState;
    }

    case GET_PATIENTS_DATA_ERROR: {
      const newState = cloneDeep(state);
      newState.loading = false;
      newState.loaded = false;
      newState.error = action.err ? action.err.message : 'Failed to retrieve patients data';
      return newState;
    }

    default: {
      return state;
    }
  }
}
