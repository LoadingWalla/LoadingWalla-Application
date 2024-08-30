import updateState from '../../Utils/UpdateState';
import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  wsMessages: [],
  wsConnected: false,
  wsError: null,
  wsDevices: [],
  wsEvents: [],
  wsPositions: [],
  wsMessages22: {
    devices: [],
    positions: [],
    events: [],
  },
};

const webSocketReducer = (state = initialState, action) => {
  const {payload, type} = action;
  // console.log('WebsocketReducer------------>>>', payload, type);

  switch (type) {
    case actionTypes.WEBSOCKET_CONNECT:
      return {...state, wsConnected: true};
    case actionTypes.WEBSOCKET_DISCONNECT:
      return {
        ...initialState, // Reset to initial state
        wsConnected: false, // Ensure wsConnected is explicitly set to false
      };
    case actionTypes.WEBSOCKET_MESSAGE: {
      const {devices = [], positions = [], events = []} = payload;

      return {
        ...state,
        wsMessages: [...state.wsMessages, payload], // Keep the full message log if needed
        wsMessages22: {
          devices: [...state.wsMessages22.devices, ...devices],
          positions: [...state.wsMessages22.positions, ...positions],
          events: [...state.wsMessages22.events, ...events],
        },
        wsConnected: true,
      };
    }
    case actionTypes.WEBSOCKET_ERROR:
      return updateState(state, {wsError: payload, wsConnected: false});
    case actionTypes.WEBSOCKET_CLOSED:
      // return updateState(state, {wsConnected: false});
      return {
        ...initialState, // Reset to initial state
        wsConnected: false, // Ensure wsConnected is explicitly set to false
      };
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
