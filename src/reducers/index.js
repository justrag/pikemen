import { combineReducers } from 'redux';
import R from 'ramda';
import {
  selectSource,
  selectTarget,
  selectDirection,
  movePyramid,
} from '../actions/';
import { RED, BLUE, NONE, N, NE, E, SE, S, SW, W, NW } from '../constants/';
import { move } from '../game/';

const initBoard = {
  1: {
    1: { pyramid: 'big-red-1', target: false, selected: false },
    2: { pyramid: 'big-red-2', target: false, selected: false },
    3: { pyramid: 'big-red-3', target: false, selected: false },
    4: { pyramid: 'mid-red-4', target: false, selected: false },
    5: { pyramid: 'small-red-1', target: false, selected: false },
    6: { pyramid: null, target: false, selected: false },
    7: { pyramid: null, target: false, selected: false },
    8: { pyramid: null, target: false, selected: false },
  },
  2: {
    1: { pyramid: 'big-red-4', target: false, selected: false },
    2: { pyramid: 'mid-red-1', target: false, selected: false },
    3: { pyramid: 'mid-red-2', target: false, selected: false },
    4: { pyramid: 'small-red-2', target: false, selected: false },
    5: { pyramid: null, target: false, selected: false },
    6: { pyramid: null, target: false, selected: false },
    7: { pyramid: null, target: false, selected: false },
    8: { pyramid: null, target: false, selected: false },
  },
  3: {
    1: { pyramid: 'big-red-5', target: false, selected: false },
    2: { pyramid: 'mid-red-3', target: false, selected: false },
    3: { pyramid: 'small-red-3', target: false, selected: false },
    4: { pyramid: null, target: false, selected: false },
    5: { pyramid: null, target: false, selected: false },
    6: { pyramid: null, target: false, selected: false },
    7: { pyramid: null, target: false, selected: false },
    8: { pyramid: null, target: false, selected: false },
  },
  4: {
    1: { pyramid: 'mid-red-5', target: false, selected: false },
    2: { pyramid: 'small-red-4', target: false, selected: false },
    3: { pyramid: null, target: false, selected: false },
    4: { pyramid: null, target: false, selected: false },
    5: { pyramid: null, target: false, selected: false },
    6: { pyramid: null, target: false, selected: false },
    7: { pyramid: null, target: false, selected: false },
    8: { pyramid: 'small-blue-1', target: false, selected: false },
  },
  5: {
    1: { pyramid: 'small-red-5', target: false, selected: false },
    2: { pyramid: null, target: false, selected: false },
    3: { pyramid: null, target: false, selected: false },
    4: { pyramid: null, target: false, selected: false },
    5: { pyramid: null, target: false, selected: false },
    6: { pyramid: null, target: false, selected: false },
    7: { pyramid: 'small-blue-2', target: false, selected: false },
    8: { pyramid: 'mid-blue-1', target: false, selected: false },
  },
  6: {
    1: { pyramid: null, target: false, selected: false },
    2: { pyramid: null, target: false, selected: false },
    3: { pyramid: null, target: false, selected: false },
    4: { pyramid: null, target: false, selected: false },
    5: { pyramid: null, target: false, selected: false },
    6: { pyramid: 'small-blue-3', target: false, selected: false },
    7: { pyramid: 'mid-blue-2', target: false, selected: false },
    8: { pyramid: 'big-blue-1', target: false, selected: false },
  },
  7: {
    1: { pyramid: null, target: false, selected: false },
    2: { pyramid: null, target: false, selected: false },
    3: { pyramid: null, target: false, selected: false },
    4: { pyramid: null, target: false, selected: false },
    5: { pyramid: 'small-blue-4', target: false, selected: false },
    6: { pyramid: 'mid-blue-3', target: false, selected: false },
    7: { pyramid: 'mid-blue-4', target: false, selected: false },
    8: { pyramid: 'big-blue-2', target: false, selected: false },
  },
  8: {
    1: { pyramid: null, target: false, selected: false },
    2: { pyramid: null, target: false, selected: false },
    3: { pyramid: null, target: false, selected: false },
    4: { pyramid: 'small-blue-5', target: false, selected: false },
    5: { pyramid: 'mid-blue-5', target: false, selected: false },
    6: { pyramid: 'big-blue-3', target: false, selected: false },
    7: { pyramid: 'big-blue-4', target: false, selected: false },
    8: { pyramid: 'big-blue-5', target: false, selected: false },
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

export const getPyramids = state => state.pyramids;
export const getPlayer = state => state.player;
export const getTurn = state => state.turn;
export const getSelected = state => state.selected;

export const getBoard = state => state.board;

const source = (state = null, { type, payload }) => {
  switch (type) {
    case selectSource.type: {
      const { row, column } = payload;
      return { row, column };
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
    case selectTarget.type: {
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
  return state;
};

const reducer = combineReducers({
  board,
  pyramids,
  move,
  player,
  turn,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case selectSource.type: {
      const { row, column } = payload;
      return R.assocPath(['move', 'source'], { row, column }, state);
    }
    case selectTarget.type: {
      const { row, column } = payload;
      return R.assocPath(['move', 'target'], { row, column }, state);
    }
    case selectDirection.type: {
      const { direction } = payload;
      return R.assocPath(['move', 'direction'], direction, state);
    }
    case movePyramid.type: {
      //      const pyramid=R.path(["board",row,column,"pyramid"], state);
      //      R.assocPath(["board",row,column,"pyramid"], pyramid, state);

      /*      const pyramidId = R.mergeDeepRight(
        state,
        {board: {[state.move.source.row]: {[state.move.source.column]: {pyramid: null}}},
        ['board', state.move.source.row, state.move.source.column, 'pyramid'],
        ['board', state.move.target.row, state.move.target.column, 'pyramid'],
        pyramidId,
        ['pyramids', pyramidId, 'direction'],
        state.move.direction,
      );
*/
      return {
        ...state,
        pyramids: state.pyramids.map(p => {
          if (
            p.row === state.selected.row &&
            p.column === state.selected.column
          ) {
            console.log({ ...p, column, row });
            return { ...p, column, row };
          } else {
            return p;
          }
        }),
      };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
