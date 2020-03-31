import {
  CLEAR_ALL_HELP_REQUESTS,
  GET_HELP_REQUESTS_STARTING,
  GET_HELP_REQUESTS_SUCCESS,
  GET_HELP_REQUESTS_ERROR,

  SEND_REQUEST_HELP_STARTING,
  SEND_REQUEST_HELP_SUCCESS,
  SEND_REQUEST_HELP_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { getApiUrl } from "../api/config"

export function clearAllHelpRequests() {
  return { type: CLEAR_ALL_HELP_REQUESTS };
}

export function getHelpRequestsStarting(lat, lng, radius, status) {
  return { type: GET_HELP_REQUESTS_STARTING, lat, lng, radius, status };
}

export function getHelpRequestsSuccess(lat, lng, radius, status, data) {
  return { type: GET_HELP_REQUESTS_SUCCESS, lat, lng, radius, status, data }
}

export function getHelpRequestsFailed(lat, lng, radius, status, err) {
  return { type: GET_HELP_REQUESTS_ERROR, lat, lng, radius, status, err }
}

export function getHelpRequests(stateName, lat, lng, radius, status, page = 1, limit = 100000) {
  return dispatch => (
    axios.get(`${getApiUrl(stateName)}/help_requests`, {
      params: {
        lat,
        lng,
        radius,
        page,
        limit,
      },
    }).then((response) => {
      if (response && response.status === 200 && response.data.success) {
        dispatch(getHelpRequestsSuccess(lat, lng, radius, status, response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to fetch help requests');
      dispatch(getHelpRequestsFailed(lat, lng, radius, status, err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(getHelpRequestsFailed(lat, lng, radius, status, error));
    }));
}

export function sendRequestHelpStarting() {
  return { type: SEND_REQUEST_HELP_STARTING };
}

export function sendRequestHelpSuccess(data) {
  return { type: SEND_REQUEST_HELP_SUCCESS, data }
}

export function sendRequestHelpFailed(err) {
  return { type: SEND_REQUEST_HELP_ERROR, err }
}

export function sendRequestHelp(stateName, reportData) {
  return dispatch => (
    axios.post(`${getApiUrl(stateName)}/help_requests`, reportData).then((response) => {
      if (response && response.status === 200 && response.data.success) {
        dispatch(sendRequestHelpSuccess(response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to send new help request');
      dispatch(sendRequestHelpFailed(err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(sendRequestHelpFailed(error));
    }));
}
