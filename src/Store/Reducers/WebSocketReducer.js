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

const deepMerge = (target, source) => {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) {
        target[key] = {};
      } // Ensure the target has a corresponding object
      deepMerge(target[key], source[key]); // Recursively merge nested objects
    } else {
      target[key] = source[key]; // Otherwise, perform a shallow merge
    }
  }
  return target;
};

const updateOrMergeData = (existingArray, newArray, key) => {
  // console.log(123456789, existingArray, newArray, key);

  const existingMap = new Map(existingArray.map(item => [item[key], item]));
  // console.log(987654321, existingArray);

  newArray.forEach(newItem => {
    if (existingMap.has(newItem[key])) {
      // Update the existing item with new data where available
      const existingItem = existingMap.get(newItem[key]);
      // existingMap.set(newItem[key], {...existingItem, ...newItem});
      existingMap.set(newItem[key], deepMerge({...existingItem}, newItem));
    } else {
      // Add new item if not already present
      existingMap.set(newItem[key], newItem);
    }
  });
  // console.log(1122334455667788, Array.from(existingMap.values()));

  return Array.from(existingMap.values());
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
      // console.log(777777777, devices);
      return {
        ...state,
        wsMessages: [...state.wsMessages, payload],
        wsMessages22: {
          devices: updateOrMergeData(
            state.wsMessages22?.devices,
            devices,
            'id',
          ),
          positions: updateOrMergeData(
            state.wsMessages22?.positions,
            positions,
            'deviceId',
          ),
          events: updateOrMergeData(
            state.wsMessages22?.events,
            events,
            'deviceId',
          ),
        },
        // wsMessages22: {
        //   devices: [...state.wsMessages22.devices, ...devices],
        //   positions: [...state.wsMessages22.positions, ...positions],
        //   events: [...state.wsMessages22.events, ...events],
        // },
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
