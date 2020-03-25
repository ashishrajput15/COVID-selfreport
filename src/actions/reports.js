import {
  GET_REPORTS_DATA_STARTING,
  GET_REPORTS_DATA_SUCCESS,
  GET_REPORTS_DATA_ERROR,

  SEND_REPORT_STARTING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { getApiUrl } from "../api/config";

export function getReportsDataStarting(query) {
  return { type: GET_REPORTS_DATA_STARTING, query };
}

export function getReportsDataSuccess(data) {
  return { type: GET_REPORTS_DATA_SUCCESS, data }
}

export function getReportsDataFailed(err) {
  return { type: GET_REPORTS_DATA_ERROR, err }
}

export function getReportsData(stateName, lat, lng, radius, page = 1, limit = 800) {
  return dispatch => (
    axios.get(`${getApiUrl(stateName)}/reports`, {
      params: {
        lat,
        lng,
        radius,
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

export function sendReportStarting() {
  return { type: SEND_REPORT_STARTING };
}

export function sendReportSuccess(data) {
  return { type: SEND_REPORT_SUCCESS, data }
}

export function sendReportFailed(err) {
  return { type: SEND_REPORT_ERROR, err }
}

export function sendReport(stateName, reportData) {
  return dispatch => (
    axios.post(`${getApiUrl(stateName)}/reports`, reportData).then((response) => {
      if (response && response.status === 200 && response.data.success) {
        dispatch(sendReportSuccess(response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to send new report');
      dispatch(sendReportFailed(err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(sendReportFailed(error));
    }));
}
