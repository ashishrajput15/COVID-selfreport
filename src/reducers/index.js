import { combineReducers } from 'redux';
import patientsData from './patientsDataReducer';
import reportModal from './reportReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  patientsData,
  reportModal,
});

export default rootReducer;
