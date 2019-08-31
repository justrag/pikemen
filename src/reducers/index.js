import { combineReducers } from 'redux';
import produce from 'immer';
import {
  selectSource,
  selectTarget,
  selectDirection,
  performMove,
} from '../actions/';
import { RED, BLUE, NONE, N, NE, E, SE, S, SW, W, NW } from '../constants/';
//import { move } from '../game/';

import range from '../lib/range';

const startPosition = {
  'big-red-1': { color: RED, size: 3, row: 1, column: 1 },
  'big-red-2': { color: RED, size: 3, row: 1, column: 2 },
  'big-red-3': { color: RED, size: 3, row: 1, column: 3 },
  'big-red-4': { color: RED, size: 3, row: 2, column: 1 },
  'big-red-5': { color: RED, size: 3, row: 3, column: 1 },
  'mid-red-1': { color: RED, size: 2, row: 2, column: 2 },
  'mid-red-2': { color: RED, size: 2, row: 2, column: 3 },
  'mid-red-3': { color: RED, size: 2, row: 3, column: 2 },
  'mid-red-4': { color: RED, size: 2, row: 1, column: 4 },
  'mid-red-5': { color: RED, size: 2, row: 4, column: 1 },
  'small-red-1': { color: RED, size: 1, row: 1, column: 5 },
  'small-red-2': { color: RED, size: 1, row: 2, column: 4 },
  'small-red-3': { color: RED, size: 1, row: 3, column: 3 },
  'small-red-4': { color: RED, size: 1, row: 4, column: 2 },
  'small-red-5': { color: RED, size: 1, row: 5, column: 1 },
  'big-blue-1': { color: BLUE, size: 3, row: 6, column: 8 },
  'big-blue-2': { color: BLUE, size: 3, row: 7, column: 8 },
  'big-blue-3': { color: BLUE, size: 3, row: 8, column: 6 },
  'big-blue-4': { color: BLUE, size: 3, row: 8, column: 7 },
  'big-blue-5': { color: BLUE, size: 3, row: 8, column: 8 },
  'mid-blue-1': { color: BLUE, size: 2, row: 5, column: 8 },
  'mid-blue-2': { color: BLUE, size: 2, row: 6, column: 7 },
  'mid-blue-3': { color: BLUE, size: 2, row: 7, column: 6 },
  'mid-blue-4': { color: BLUE, size: 2, row: 7, column: 7 },
  'mid-blue-5': { color: BLUE, size: 2, row: 8, column: 5 },
  'small-blue-1': { color: BLUE, size: 1, row: 4, column: 8 },
  'small-blue-2': { color: BLUE, size: 1, row: 5, column: 7 },
  'small-blue-3': { color: BLUE, size: 1, row: 6, column: 6 },
  'small-blue-4': { color: BLUE, size: 1, row: 7, column: 5 },
  'small-blue-5': { color: BLUE, size: 1, row: 8, column: 4 },
};

const one2eight = range(1, 8);

const initBoard = {};
one2eight.forEach(row => {
  one2eight.forEach(column => {
    initBoard[`${row}-${column}`] = {
      row,
      column,
      pyramid: null,
      isTargettable: false,
      isOnPath: false,
    };
  });
});

// {
//   1-1: {row: 1, column: 1, pyramid: null, isTargettable: false, isOnPath: false },
//   1-2: {row: 1, column: 2, pyramid: null, isTargettable: false, isOnPath: false },
// ...
// }

Object.entries(startPosition).forEach(([pyramidId, { row, column }]) => {
  initBoard[`${row}-${column}`].pyramid = pyramidId;
});

const initPyramids = Object.entries(startPosition).reduce(
  (pyramids, [key, { color, size }]) => ({
    ...pyramids,
    [key]: {
      color,
      size,
      direction: NONE,
    },
  }),
  {},
);

export const getPyramid = (state, pyramidId) => state.pyramids[pyramidId];
export const getField = (state, row, column) => state.board[`${row}-${column}`];
export const getPlayer = state => state.player;
export const getTurn = state => state.turn;
export const getSource = state => state.move.source;
export const getTarget = state => state.move.target;
export const getDirection = state => state.move.direction;
export const getIsMoveReady = state =>
  getSource(state) && getTarget(state) && getDirection(state);

const source = (state = null, { type, payload }) => {
  switch (type) {
    case selectSource.type: {
      const { pyramidId } = payload;
      return pyramidId;
    }
    case performMove.type: {
      return null;
    }
    default: {
      return state;
    }
  }
};
const target = (state = null, { type, payload }) => {
  switch (type) {
    case selectTarget.type: {
      const { row, column } = payload;
      return { row, column };
    }
    case selectSource.type:
    case performMove.type: {
      return null;
    }
    default: {
      return state;
    }
  }
};
const direction = (state = null, { type, payload }) => {
  switch (type) {
    case selectDirection.type: {
      const { direction } = payload;
      return direction;
    }
    case selectSource.type:
    case selectTarget.type:
    case performMove.type: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const move = combineReducers({
  source,
  target,
  direction,
});

const player = (state = initPlayer, { type, payload }) => {
  switch (type) {
    case performMove.type: {
      return state === RED ? BLUE : RED;
    }
    default: {
      return state;
    }
  }
};

const initPlayer = RED;

const turn = (fullState = initFullState, { type, payload }) => {
  const state = fullState.turn;
  switch (type) {
    case performMove.type: {
      const player = fullState.player;
      if (player === BLUE) {
        return state + 1;
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};

const initTurn = 1;

const initFullState = () => {
  return {
    pyramids: initPyramids,
    board: initBoard,
    move: move(undefined, {}),
    turn: initTurn,
    player: initPlayer,
  };
};

const pyramids = (fullState = initFullState, { type, payload }) => {
  const state = fullState.pyramids;
  switch (type) {
    case performMove.type: {
      const { source, direction } = fullState.move;
      const nextState = produce(state, draft => {
        draft[source].direction = direction;
      });
      return nextState;
    }
    default: {
      return state;
    }
  }
};

const board = (fullState = initFullState, { type, payload }) => {
  const state = fullState.board;
  switch (type) {
    case selectSource.type: {
      const nextState = produce(state, draft => {
        const { pyramidId } = payload;
        const direction = fullState.pyramids[pyramidId].direction;

        let { row, column } = Object.values(draft).find(
          ({ pyramid }) => pyramid === pyramidId,
        );

        if (direction !== NONE) {
          while (true) {
            [row, column] = move(row, column, direction);
            console.log({ row, column });
            if (
              row < 1 ||
              row > 8 ||
              column < 1 ||
              column > 8 ||
              draft[`${row}-${column}`].pyramid
            ) {
              break;
            }
            draft[`${row}-${column}`].isTargettable = true;
          }
        }
      });
      return nextState;
    }
    default: {
      return state;
    }
  }
};

const sequentiallyCombineReducers = (fullState, action) => ({
  move: move(fullState.move, action),
  pyramids: pyramids(fullState, action),
  board: board(fullState, action),
  turn: turn(fullState, action),
  player: player(fullState.player, action),
});

const reducer = sequentiallyCombineReducers;

/* const reducer = combineReducers({
  board,
  pyramids,
  move,
  player,
  turn,
});
 */
export default reducer;
