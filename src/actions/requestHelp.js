import {
  SEND_REPORT_STARTING,
  SEND_REPORT_SUCCESS,
  SEND_REPORT_ERROR,
} from './actionTypes';
import axios from "../api/axios";
import { apiBaseUrl } from "../api/config"

export function sendRequestHelpStarting() {
  return { type: SEND_REPORT_STARTING };
}

export function sendRequestHelpSuccess(data) {
  return { type: SEND_REPORT_SUCCESS, data }
}

export function sendRequestHelpFailed(err) {
  return { type: SEND_REPORT_ERROR, err }
}

export function sendRequestHelp(reportData) {
  return dispatch => (
    axios.post(`${apiBaseUrl}/help_requests`, reportData).then((response) => {
      if (response && response.status === 200 && response.data.success) {
        dispatch(sendRequestHelpSuccess(response.data));
        return;
      }
      const err = (response && response.data && response.data.error) ?
        new Error(response.data.error) : new Error('Failed to send new report');
      dispatch(sendRequestHelpFailed(err));
    }).catch((err) => {
      const error = (err.response && err.response.data && err.response.data.error) ?
        new Error(err.response.data.error) : err;
      dispatch(sendRequestHelpFailed(error));
    }));
}
