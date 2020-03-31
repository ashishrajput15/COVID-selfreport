import { cloneDeep } from 'lodash';
import {
  CLEAR_ALL_PATIENTS,
  GET_PATIENTS_DATA_STARTING,
  GET_PATIENTS_DATA_SUCCESS,
  GET_PATIENTS_DATA_ERROR,
} from '../actions/actionTypes';
import initialState from './initialState';
import { getLatLngKey } from './helpRequestsReducer';

export default function patientsDataReducer(state = initialState.patientsData, action) {
  switch (action.type) {
    case CLEAR_ALL_PATIENTS: {
      return cloneDeep(initialState.patientsData);
    }

    case GET_PATIENTS_DATA_STARTING: {
      const { lat, lng, radius, status } = action;
      const latlngKey = getLatLngKey(lat, lng, radius, status);

      const newState = cloneDeep(state);
      if (!newState[latlngKey]) {
        newState[latlngKey] = cloneDeep(initialState.patientsData.latlngKey);
      }

      const latlngData = newState[latlngKey];
      latlngData.loading = true;
      latlngData.loaded = false;
      latlngData.ids = [];
      latlngData.map = {};
      latlngData.error = null;
      return newState;
    }

    case GET_PATIENTS_DATA_SUCCESS: {
      const { data, lat, lng, radius, status } = action;
      const latlngKey = getLatLngKey(lat, lng, radius, status);

      const newState = cloneDeep(state);
      if (!newState[latlngKey]) {
        newState[latlngKey] = cloneDeep(initialState.patientsData.latlngKey);
      }

      const latlngData = newState[latlngKey];
      latlngData.loading = false;
      latlngData.loaded = true;

      data.patients.forEach((p) => {
        latlngData.ids.push(p._id);
        latlngData.map[p._id] = p;
      });

      latlngData.error = null;
      return newState;
    }

    case GET_PATIENTS_DATA_ERROR: {
      const { lat, lng, radius, status } = action;
      const latlngKey = getLatLngKey(lat, lng, radius, status);

      const newState = cloneDeep(state);
      if (!newState[latlngKey]) {
        newState[latlngKey] = cloneDeep(initialState.patientsData.latlngKey);
      }

      const latlngData = newState[latlngKey];
      latlngData.loading = false;
      latlngData.loaded = false;
      latlngData.error = action.err ? action.err.message : 'Failed to retrieve patients data';
      return newState;
    }

    default: {
      return state;
    }
  }
}
