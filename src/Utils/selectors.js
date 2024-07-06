import {createSelector} from 'reselect';

const getDevicesState = state => state.devices || [];
const getPositionsState = state => state.positions || [];
const getEventsState = state => state.events || [];

export const selectLatestDevice = createSelector([getDevicesState], devices =>
  devices.length > 0 ? devices[devices.length - 1] : null,
);

// export const selectAllPositions = createSelector(
//   [getPositionsState],
//   positions => (positions.length > 0 ? positions[positions?.length - 1] : null),
// );
export const selectAllPositions = createSelector(
  [getPositionsState],
  positions => positions,
);

export const selectLatestEvent = createSelector([getEventsState], events =>
  events.length > 0 ? events[events.length - 1] : null,
);
