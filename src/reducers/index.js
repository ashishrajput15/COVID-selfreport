import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import helpRequests from './helpRequestsReducer';
import patientsData from './patientsDataReducer';
import reportsData from './reportsDataReducer';
import sendNewReport from './sendNewReportReducer';
import sendNewReqHelp from './sendNewReqHelpReducer';
import language from './language';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  helpRequests,
  patientsData,
  reportsData,
  sendNewReport,
  sendNewReqHelp,
  language,
});

export default rootReducer;
