import { combineReducers } from 'redux';
import patientsData from './patientsDataReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  patientsData,
});

export default rootReducer;
