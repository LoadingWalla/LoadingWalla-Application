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
      emit(actions.websocketError(error.message));
    };

    ws.onclose = event => {
      console.log('onclose', event);
      emit(actions.websocketClosed());
      if (event.code !== 1000) {
        emit(actions.websocketRetry());
      }
    };

    return () => {
      ws.close();
    };
  });
}

function* handleWebSocketConnection(cookie) {
  const channel = yield call(createWebSocketChannel, cookie);

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
    } else {
      yield put(action);
    }
  }
}

function* websocketSaga() {
  let connectionTask;
  let retryCount = 0;

  while (true) {
    const {payload} = yield take(actionTypes.WEBSOCKET_CONNECT);
    const {cookie} = payload;
    console.log(444, cookie);

    if (connectionTask) {
      yield cancel(connectionTask);
    }

    connectionTask = yield fork(handleWebSocketConnection, cookie);

    const action = yield take([
      actionTypes.WEBSOCKET_DISCONNECT,
      actionTypes.WEBSOCKET_RETRY,
    ]);

    if (action.type === actionTypes.WEBSOCKET_DISCONNECT) {
      yield cancel(connectionTask);
    } else if (action.type === actionTypes.WEBSOCKET_RETRY) {
      retryCount++;
      if (retryCount <= 5) {
        yield delay(5000); // Retry after 5 seconds
        connectionTask = yield fork(handleWebSocketConnection, cookie);
      } else {
        console.log('Max retry attempts reached');
      }
    }
  }
}

export default websocketSaga;
