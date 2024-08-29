import {combineReducers} from 'redux';
import data from './Reducer';
import webSocketData from './WebSocketReducer';

const rootReducer = combineReducers({
  data,
  webSocketData,
});

export default rootReducer;
