import { cloneDeep, round } from 'lodash';
import {
  CLEAR_ALL_HELP_REQUESTS,
  GET_HELP_REQUESTS_STARTING,
  GET_HELP_REQUESTS_SUCCESS,
  GET_HELP_REQUESTS_ERROR,
} from '../actions/actionTypes';
import initialState from './initialState';

export function getLatLngKey(lat, lng, radius, viewType) {
  lat = round(lat, 1);
  lng = round(lng, 1);
  return `${viewType}-${lat}-${lng}-${radius}`;
}

export default function helpRequestsReducer(state = initialState.helpRequests, action) {
  switch (action.type) {
    case CLEAR_ALL_HELP_REQUESTS: {
      return cloneDeep(initialState.helpRequests);
    }

    case GET_HELP_REQUESTS_STARTING: {
      const { lat, lng, radius, status } = action;
      const latlngKey = getLatLngKey(lat, lng, radius, status);

      const newState = cloneDeep(state);
      if (!newState[latlngKey]) {
        newState[latlngKey] = cloneDeep(initialState.helpRequests.latlngKey);
      }

      const latlngData = newState[latlngKey];
      latlngData.loading = true;
      latlngData.loaded = false;
      latlngData.ids = [];
      latlngData.map = {};
      latlngData.error = null;
      return newState;
    }

    case GET_HELP_REQUESTS_SUCCESS: {
      const { data, lat, lng, radius, status } = action;
      const latlngKey = getLatLngKey(lat, lng, radius, status);

      const newState = cloneDeep(state);
      if (!newState[latlngKey]) {
        newState[latlngKey] = cloneDeep(initialState.helpRequests.latlngKey);
      }

      const latlngData = newState[latlngKey];
      latlngData.loading = false;
      latlngData.loaded = true;

      data.helpRequests.forEach((p) => {
        latlngData.ids.push(p._id);
        latlngData.map[p._id] = p;
      });

      latlngData.error = null;
      return newState;
    }

    case GET_HELP_REQUESTS_ERROR: {
      const { lat, lng, radius, status } = action;
      const latlngKey = getLatLngKey(lat, lng, radius, status);

      const newState = cloneDeep(state);
      if (!newState[latlngKey]) {
        newState[latlngKey] = cloneDeep(initialState.helpRequests.latlngKey);
      }

      const latlngData = newState[latlngKey];
      latlngData.loading = false;
      latlngData.loaded = false;
      latlngData.error = action.err ? action.err.message : 'Failed to retrieve help requests data';
      return newState;
    }

    default: {
      return state;
    }
  }
}
