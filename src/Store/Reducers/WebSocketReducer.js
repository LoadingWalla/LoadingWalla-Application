import updateState from '../../Utils/UpdateState';
import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  wsMessages: [],
  wsConnected: false,
  wsError: null,
  wsDevices: [],
  wsEvents: [],
  wsPositions: [],
};

const webSocketReducer = (state = initialState, action) => {
  const {payload, type} = action;
  console.log('WebsocketReducer------------>>>', payload);

  switch (type) {
    case actionTypes.WEBSOCKET_CONNECT:
      return {...state, wsConnected: true};
    case actionTypes.WEBSOCKET_DISCONNECT:
      return updateState(state, {wsConnected: false, wsError: null});
    case actionTypes.WEBSOCKET_MESSAGE:
      return updateState(state, {
        wsMessages: [...state.wsMessages, payload],
        wsConnected: true,
      });
    case actionTypes.WEBSOCKET_ERROR:
      return updateState(state, {wsError: payload, wsConnected: false});
    case actionTypes.WEBSOCKET_CLOSED:
      return updateState(state, {wsConnected: false});
    case actionTypes.UPDATE_DEVICES:
      return updateState(state, {wsDevices: payload, wsConnected: true});
    case actionTypes.UPDATE_POSITIONS:
      return updateState(state, {wsPositions: payload, wsConnected: true});
    case actionTypes.UPDATE_EVENTS:
      return updateState(state, {wsEvents: payload, wsConnected: true});
    // default state
    default:
      return state;
  }
};

export default webSocketReducer;
