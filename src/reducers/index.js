import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import helpRequests from './helpRequestsReducer';
import patientsData from './patientsDataReducer';
import reportsData from './reportsDataReducer';
import sendNewReport from './sendNewReportReducer';
import sendNewReqHelp from './sendNewReqHelpReducer'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  helpRequests,
  patientsData,
  reportsData,
  sendNewReport,
  sendNewReqHelp,
});

export default rootReducer;
