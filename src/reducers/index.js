import { combineReducers } from 'redux';
import coronaData from './coronaDataReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  coronaData,
});

export default rootReducer;
