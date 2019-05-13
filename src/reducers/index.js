import { combineReducers } from 'redux';
import R from 'ramda';
import { selectSource, selectTarget, selectDirection } from '../actions/';
import { RED, BLUE, NONE, N, NE, E, SE, S, SW, W, NW } from '../constants/';
//import { move } from '../game/';

const initBoard = {
  1: {
    1: { pyramid: 'big-red-1', targettable: false },
    2: { pyramid: 'big-red-2', targettable: false },
    3: { pyramid: 'big-red-3', targettable: false },
    4: { pyramid: 'mid-red-4', targettable: false },
    5: { pyramid: 'small-red-1', targettable: false },
    6: { pyramid: null, targettable: false },
    7: { pyramid: null, targettable: false },
    8: { pyramid: null, targettable: false },
  },
  2: {
    1: { pyramid: 'big-red-4', targettable: false },
    2: { pyramid: 'mid-red-1', targettable: false },
    3: { pyramid: 'mid-red-2', targettable: false },
    4: { pyramid: 'small-red-2', targettable: false },
    5: { pyramid: null, targettable: false },
    6: { pyramid: null, targettable: false },
    7: { pyramid: null, targettable: false },
    8: { pyramid: null, targettable: false },
  },
  3: {
    1: { pyramid: 'big-red-5', targettable: false },
    2: { pyramid: 'mid-red-3', targettable: false },
    3: { pyramid: 'small-red-3', targettable: false },
    4: { pyramid: null, targettable: false },
    5: { pyramid: null, targettable: false },
    6: { pyramid: null, targettable: false },
    7: { pyramid: null, targettable: false },
    8: { pyramid: null, targettable: false },
  },
  4: {
    1: { pyramid: 'mid-red-5', targettable: false },
    2: { pyramid: 'small-red-4', targettable: false },
    3: { pyramid: null, targettable: false },
    4: { pyramid: null, targettable: false },
    5: { pyramid: null, targettable: false },
    6: { pyramid: null, targettable: false },
    7: { pyramid: null, targettable: false },
    8: { pyramid: 'small-blue-1', targettable: false },
  },
  5: {
    1: { pyramid: 'small-red-5', targettable: false },
    2: { pyramid: null, targettable: false },
    3: { pyramid: null, targettable: false },
    4: { pyramid: null, targettable: false },
    5: { pyramid: null, targettable: false },
    6: { pyramid: null, targettable: false },
    7: { pyramid: 'small-blue-2', targettable: false },
    8: { pyramid: 'mid-blue-1', targettable: false },
  },
  6: {
    1: { pyramid: null, targettable: false },
    2: { pyramid: null, targettable: false },
    3: { pyramid: null, targettable: false },
    4: { pyramid: null, targettable: false },
    5: { pyramid: null, targettable: false },
    6: { pyramid: 'small-blue-3', targettable: false },
    7: { pyramid: 'mid-blue-2', targettable: false },
    8: { pyramid: 'big-blue-1', targettable: false },
  },
  7: {
    1: { pyramid: null, targettable: false },
    2: { pyramid: null, targettable: false },
    3: { pyramid: null, targettable: false },
    4: { pyramid: null, targettable: false },
    5: { pyramid: 'small-blue-4', targettable: false },
    6: { pyramid: 'mid-blue-3', targettable: false },
    7: { pyramid: 'mid-blue-4', targettable: false },
    8: { pyramid: 'big-blue-2', targettable: false },
  },
  8: {
    1: { pyramid: null, targettable: false },
    2: { pyramid: null, targettable: false },
    3: { pyramid: null, targettable: false },
    4: { pyramid: 'small-blue-5', targettable: false },
    5: { pyramid: 'mid-blue-5', targettable: false },
    6: { pyramid: 'big-blue-3', targettable: false },
    7: { pyramid: 'big-blue-4', targettable: false },
    8: { pyramid: 'big-blue-5', targettable: false },
  },
};

const initPyramids = {
  'big-red-1': { color: RED, size: 3, direction: SE },
  'big-red-2': { color: RED, size: 3, direction: SE },
  'big-red-3': { color: RED, size: 3, direction: SE },
  'big-red-4': { color: RED, size: 3, direction: SE },
  'big-red-5': { color: RED, size: 3, direction: SE },

  'mid-red-1': { color: RED, size: 2, direction: SE },
  'mid-red-2': { color: RED, size: 2, direction: SE },
  'mid-red-3': { color: RED, size: 2, direction: SE },
  'mid-red-4': { color: RED, size: 2, direction: SE },
  'mid-red-5': { color: RED, size: 2, direction: SE },

  'small-red-1': { color: RED, size: 1, direction: SE },
  'small-red-2': { color: RED, size: 1, direction: SE },
  'small-red-3': { color: RED, size: 1, direction: SE },
  'small-red-4': { color: RED, size: 1, direction: SE },
  'small-red-5': { color: RED, size: 1, direction: SE },

  'big-blue-1': { color: BLUE, size: 3, direction: SE },
  'big-blue-2': { color: BLUE, size: 3, direction: SE },
  'big-blue-3': { color: BLUE, size: 3, direction: SE },
  'big-blue-4': { color: BLUE, size: 3, direction: SE },
  'big-blue-5': { color: BLUE, size: 3, direction: SE },

  'mid-blue-1': { color: BLUE, size: 2, direction: SE },
  'mid-blue-2': { color: BLUE, size: 2, direction: SE },
  'mid-blue-3': { color: BLUE, size: 2, direction: SE },
  'mid-blue-4': { color: BLUE, size: 2, direction: SE },
  'mid-blue-5': { color: BLUE, size: 2, direction: SE },

  'small-blue-1': { color: BLUE, size: 1, direction: SE },
  'small-blue-2': { color: BLUE, size: 1, direction: SE },
  'small-blue-3': { color: BLUE, size: 1, direction: SE },
  'small-blue-4': { color: BLUE, size: 1, direction: SE },
  'small-blue-5': { color: BLUE, size: 1, direction: SE },
};

export const getPyramid = (state, pyramidId) => state.pyramids[pyramidId];
export const getField = (state, row, column) => state.board[row][column];
export const getPlayer = state => state.player;
export const getTurn = state => state.turn;
export const getSource = state => state.move.source;
export const getTarget = state => state.move.target;
export const getDirection = state => state.move.direction;

const source = (state = null, { type, payload }) => {
  switch (type) {
    case selectSource.type: {
      const { pyramidId } = payload;
      return pyramidId;
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

const player = (state = RED, { type, payload }) => {
  return state;
};

const turn = (state = 1, { type, payload }) => {
  return state;
};

const pyramids = (state = initPyramids, { type, payload }) => {
  return state;
};
const board = (state = initBoard, { type, payload }) => {
  switch (type) {
    case selectSource.type: {
      const { pyramidId } = payload;

      //////////////////////////////////
      // FIXME Need to somehow get pyramids slice access
      const direction = state.pyramids[pyramidId].direction;

      ///FIXME Iterate through rows and columns
      //and find the field which has pyramidId
      let [row, column] = Object.entries(state).find();

      if (direction !== NONE) {
        while (true) {
          [row, column] = move(row, column, direction);
          console.log({ row, column });
          if (
            row < 1 ||
            row > 8 ||
            column < 1 ||
            column > 8 ||
            state[row][column].pyramidId
          ) {
            break;
          }
          state[row][column] = { ...state[row][column], target: true };
        }
      }
      return board;
      ///////////////////////////////
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  board,
  pyramids,
  move,
  player,
  turn,
});
export default reducer;
