import {eventChannel} from 'redux-saga';
import {take, call, put, fork, cancel, delay} from 'redux-saga/effects';
import {WS_URL} from '../../Utils/Url';
import * as actionTypes from '../Actions/ActionTypes';
import * as actions from '../Actions/Actions';

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
      console.log('websocket onmessage', data);
      emit(actions.websocketMessage(data));
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

function* handleWebSocketConnection(cookie) {
  const channel = yield call(createWebSocketChannel, cookie);

  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);

      if (action.type === actionTypes.WEBSOCKET_MESSAGE) {
        const {devices, positions, events} = action.payload;
        if (devices) {
          yield put(actions.updateDevices(devices));
        }
        if (positions) {
          yield put(actions.updatePositions(positions));
        }
        if (events) {
          yield put(actions.updateEvents(events));
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
    console.log('WebSocket connection requested with cookie:', cookie);

    if (connectionTask) {
      yield cancel(connectionTask);
    }

    connectionTask = yield fork(handleWebSocketConnection, cookie);

    const action = yield take([
      actionTypes.WEBSOCKET_DISCONNECT,
      actionTypes.WEBSOCKET_RETRY,
    ]);

    if (action.type === actionTypes.WEBSOCKET_DISCONNECT) {
      console.log('WebSocket disconnect requested');
      yield cancel(connectionTask);
      console.log('WebSocket connection task cancelled');
    } else if (action.type === actionTypes.WEBSOCKET_RETRY) {
      retryCount++;
      if (retryCount <= 5) {
        console.log('WebSocket retry attempt:', retryCount);
        yield delay(5000); // Retry after 5 seconds
        connectionTask = yield fork(handleWebSocketConnection, cookie);
      } else {
        console.log('Max retry attempts reached');
      }
    }
  }
}

export default websocketSaga;
