import {
  CLEAR_ALL_PATIENTS,
  GET_PATIENTS_DATA_STARTING,
  GET_PATIENTS_DATA_SUCCESS,
  GET_PATIENTS_DATA_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { getApiUrl } from "../api/config";

export function clearAllPatients() {
  return { type: CLEAR_ALL_PATIENTS };
}

export function getPatientsDataStarting(lat, lng, radius, status) {
  return { type: GET_PATIENTS_DATA_STARTING, lat, lng, radius, status };
}

export function getPatientsDataSuccess(lat, lng, radius, status, data) {
  return { type: GET_PATIENTS_DATA_SUCCESS, lat, lng, radius, status, data }
}

export function getPatientsDataFailed(lat, lng, radius, status, err) {
  return { type: GET_PATIENTS_DATA_ERROR, lat, lng, radius, status, err }
}

export function getPatientsData(stateName, lat, lng, radius, status, page = 1, limit = 100000) {
  return dispatch => (
    axios.get(`${getApiUrl(stateName)}/patients`, {
      params: {
        lat,
        lng,
        radius,
        status,
        page,
        limit,
      },
    }).then((response) => {
      if (response && response.status === 200 && response.data.success) {
        dispatch(getPatientsDataSuccess(lat, lng, radius, status, response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to fetch patient data');
      dispatch(getPatientsDataFailed(lat, lng, radius, status, err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(getPatientsDataFailed(lat, lng, radius, status, error));
    }));
}
