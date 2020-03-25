import {
  GET_HELP_REQUESTS_STARTING,
  GET_HELP_REQUESTS_SUCCESS,
  GET_HELP_REQUESTS_ERROR,

  SEND_REQUEST_HELP_STARTING,
  SEND_REQUEST_HELP_SUCCESS,
  SEND_REQUEST_HELP_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { apiBaseUrl } from "../api/config"

export function getHelpRequestsStarting(query) {
  return { type: GET_HELP_REQUESTS_STARTING, query };
}

export function getHelpRequestsSuccess(data) {
  return { type: GET_HELP_REQUESTS_SUCCESS, data }
}

export function getHelpRequestsFailed(err) {
  return { type: GET_HELP_REQUESTS_ERROR, err }
}

export function getHelpRequests(lat, lng, radius, page = 1, limit = 800) {
  return dispatch => (
    axios.get(`${apiBaseUrl}/help_requests`, {
      params: {
        lat,
        lng,
        radius,
        page,
        limit,
      },
    }).then((response) => {
      if (response && response.status === 200 && response.data.success) {
        dispatch(getHelpRequestsSuccess(response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to fetch help requests');
      dispatch(getHelpRequestsFailed(err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(getHelpRequestsFailed(error));
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

export function sendRequestHelp(reportData) {
  return dispatch => (
    axios.post(`${apiBaseUrl}/help_requests`, reportData).then((response) => {
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
