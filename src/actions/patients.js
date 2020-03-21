import {
  GET_PATIENTS_DATA_STARTING,
  GET_PATIENTS_DATA_SUCCESS,
  GET_PATIENTS_DATA_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { apiBaseUrl } from "../api/config";

export function getPatientsDataStarting(query) {
  return { type: GET_PATIENTS_DATA_STARTING, query };
}

export function getPatientsDataSuccess(data) {
  return { type: GET_PATIENTS_DATA_SUCCESS, data }
}

export function getPatientsDataFailed(err) {
  return { type: GET_PATIENTS_DATA_ERROR, err }
}

export function getPatientsData(lat, lng, radius, status, page=1, limit=800) {
  return dispatch => (
    axios.get(`${apiBaseUrl}/patients`, {
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
        dispatch(getPatientsDataSuccess(response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to fetch patient data');
      dispatch(getPatientsDataFailed(err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(getPatientsDataFailed(error));
    }));
}
