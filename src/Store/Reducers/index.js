import {combineReducers} from 'redux';
import data from './Reducer';
import wsData from './WebSocketReducer';

const rootReducer = combineReducers({
  data,
  wsData,
});

export default rootReducer;
