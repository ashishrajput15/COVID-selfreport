import {
  GET_REPORTS_DATA_STARTING,
  GET_REPORTS_DATA_SUCCESS,
  GET_REPORTS_DATA_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { apiBaseUrl } from "../api/config";

export function getReportsDataStarting(query) {
  return { type: GET_REPORTS_DATA_STARTING, query };
}

export function getReportsDataSuccess(data) {
  return { type: GET_REPORTS_DATA_SUCCESS, data }
}

export function getReportsDataFailed(err) {
  return { type: GET_REPORTS_DATA_ERROR, err }
}

export function getReportsData(lat, lng, radius, status, page=1, limit=800) {
  return dispatch => (
    axios.get(`${apiBaseUrl}/reports`, {
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
        dispatch(getReportsDataSuccess(response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to fetch reports data');
      dispatch(getReportsDataFailed(err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(getReportsDataFailed(error));
    }));
}
