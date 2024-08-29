import * as actionTypes from './ActionTypes';

// Gps Websocket Connect
export const websocketConnect = cookie => ({
  type: actionTypes.WEBSOCKET_CONNECT,
  payload: {cookie},
});

export const websocketDisconnect = () => ({
  type: actionTypes.WEBSOCKET_DISCONNECT,
});

export const websocketMessage = payload => {
  console.log(99999999, payload);
  return {
    type: actionTypes.WEBSOCKET_MESSAGE,
    payload,
  };
};

export const websocketError = error => ({
  type: actionTypes.WEBSOCKET_ERROR,
  payload: error,
});

export const websocketClosed = () => ({
  type: actionTypes.WEBSOCKET_CLOSED,
});

export const websocketRetry = () => ({
  type: actionTypes.WEBSOCKET_RETRY,
});

export const updateDevices = devices => ({
  type: actionTypes.UPDATE_DEVICES,
  payload: devices,
});

export const updatePositions = positions => ({
  type: actionTypes.UPDATE_POSITIONS,
  payload: positions,
});

export const updateEvents = events => ({
  type: actionTypes.UPDATE_EVENTS,
  payload: events,
});
