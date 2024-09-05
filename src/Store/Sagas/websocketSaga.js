import {eventChannel} from 'redux-saga';
import {take, call, put, fork, cancel, delay} from 'redux-saga/effects';
import {WS_URL} from '../../Utils/Url';
import * as actionTypes from '../Actions/ActionTypes';
import * as actions from '../Actions/WebSocketActions';
import {throttle} from 'lodash';

function createWebSocketChannel(cookie) {
  return eventChannel(emit => {
    const ws = new WebSocket(WS_URL, null, {
      headers: {
        Cookie: cookie,
      },
    });

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      // console.log('------------------websocket onmessage', data);
      // Check if the data object is not empty before emitting the action
      if (data && Object.keys(data).length > 0) {
        console.log('------------------websocket onmessage', data);
        emit(actions.websocketMessage(data));
      } else {
        console.log('----Received an empty object, not emitting action.-----');
      }
    };

    ws.onerror = error => {
      console.log('websocket onerror', error);
      emit(actions.websocketError(error));
    };

    ws.onclose = event => {
      console.log('WebSocket onclose', event);
      emit(actions.websocketClosed());
      if (event.code !== 1000) {
        emit(actions.websocketRetry());
      }
    };

    const unsubscribe = () => {
      console.log('WebSocket cleanup and close');
      ws.onclose = null; // Remove onclose handler to prevent auto-reconnect logic
      ws.onerror = null; // Remove onerror handler to prevent further error handling
      ws.onmessage = null; // Remove onmessage handler to prevent further message handling
      ws.onopen = null; // Remove onopen handler to prevent open events
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
    return unsubscribe;
  });
}

// Handle WebSocket connection
function* handleWebSocketConnection(cookie) {
  const channel = yield call(createWebSocketChannel, cookie);

  // Throttle data processing
  const handleWebSocketMessage = throttle(function* (data) {
    if (data.devices && data.devices.length > 0) {
      // console.log('<<<<<<<<<<<<<< devices true');
      yield put(actions.updateDevices(data.devices));
    }

    if (data.positions && data.positions.length > 0) {
      // console.log('<<<<<<<<<<<<<< positions true');
      yield put(actions.updatePositions(data.positions));
    }

    if (data.events && data.events.length > 0) {
      // console.log('<<<<<<<<<<<<<< events true');
      yield put(actions.updateEvents(data.events));
    } else {
      // console.log('<<<<<<<<<<<<<< all true');
      yield put(actions.websocketMessage(data));
    }
  }, 500); // Process data at most once per second

  try {
    while (true) {
      const action = yield take(channel);

      if (action.type === actionTypes.WEBSOCKET_MESSAGE) {
        const data = action.payload;

        if (data && Object.keys(data).length !== 0) {
          yield* handleWebSocketMessage(data);
        }
      } else if (action.type === actionTypes.WEBSOCKET_CLOSED) {
        console.log('WebSocket connection closed');
      }
    }
  } finally {
    console.log('WebSocket connection finally block, cleaning up');
    channel.close();
  }
}

function* websocketSaga() {
  let connectionTask;
  let retryCount = 0;

  while (true) {
    const {payload} = yield take(actionTypes.WEBSOCKET_CONNECT);
    const {cookie} = payload;
    // console.log('WebSocket connection requested with cookie:', cookie);

    if (connectionTask) {
      yield cancel(connectionTask);
    }

    connectionTask = yield fork(handleWebSocketConnection, cookie);

    const action = yield take([
      actionTypes.WEBSOCKET_DISCONNECT,
      actionTypes.WEBSOCKET_RETRY,
    ]);

    if (action.type === actionTypes.WEBSOCKET_DISCONNECT) {
      // console.log('WebSocket disconnect requested');
      yield cancel(connectionTask);
      console.log('WebSocket connection cancelled Successfully');
    } else if (action.type === actionTypes.WEBSOCKET_RETRY) {
      retryCount++;
      if (retryCount <= 5) {
        console.log('WebSocket retry attempt:', retryCount);
        const delayDuration = Math.min(2 ** retryCount * 1000, 30000); // Max delay of 30 seconds
        yield delay(delayDuration);
        connectionTask = yield fork(handleWebSocketConnection, cookie);
      } else {
        console.log('Max retry attempts reached');
      }
    }
  }
}

export default websocketSaga;
