import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import patientsData from './patientsDataReducer';
import reportsData from './reportsDataReducer';
import sendNewReport from './sendNewReportReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  patientsData,
  reportsData,
  sendNewReport,
});

export default rootReducer;
