import {
  CLEAR_ALL_REPORTS,

  GET_REPORTS_DATA_STARTING,
  GET_REPORTS_DATA_SUCCESS,
  GET_REPORTS_DATA_ERROR,

  SEND_REPORT_STARTING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { getApiUrl } from "../api/config";

export function clearAllReports() {
  return { type: CLEAR_ALL_REPORTS };
}

export function getReportsDataStarting(lat, lng, radius, status) {
  return { type: GET_REPORTS_DATA_STARTING, lat, lng, radius, status, };
}

export function getReportsDataSuccess(lat, lng, radius, status, data) {
  return { type: GET_REPORTS_DATA_SUCCESS, lat, lng, radius, status, data }
}

export function getReportsDataFailed(lat, lng, radius, status, err) {
  return { type: GET_REPORTS_DATA_ERROR, lat, lng, radius, status, err }
}

export function getReportsData(stateName, lat, lng, radius, status, page = 1, limit = 100000) {
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
        dispatch(getReportsDataSuccess(lat, lng, radius, status, response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to fetch reports data');
      dispatch(getReportsDataFailed(lat, lng, radius, status, err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(getReportsDataFailed(lat, lng, radius, status, error));
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
