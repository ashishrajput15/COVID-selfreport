import { combineReducers } from 'redux';
import patientsData from './patientsDataReducer';
import reportsData from './reportsDataReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  patientsData,
  reportsData,
});

export default rootReducer;
