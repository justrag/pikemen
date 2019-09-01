import { combineReducers } from 'redux';
import produce from 'immer';
import {
  selectSource,
  selectTarget,
  selectDirection,
  performMove,
} from '../actions/';
import {
  RED,
  BLUE,
  NONE,
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
  OFFBOARD,
} from '../constants/';
//import { move } from '../game/';

const initPyramids = {
  '1-1': {
    id: 'big-red-1',
    color: RED,
    size: 3,
    row: 1,
    column: 1,
    direction: NONE,
  },
  '1-2': {
    id: 'big-red-2',
    color: RED,
    size: 3,
    row: 1,
    column: 2,
    direction: NONE,
  },
  '1-3': {
    id: 'big-red-3',
    color: RED,
    size: 3,
    row: 1,
    column: 3,
    direction: NONE,
  },
  '2-1': {
    id: 'big-red-4',
    color: RED,
    size: 3,
    row: 2,
    column: 1,
    direction: NONE,
  },
  '3-1': {
    id: 'big-red-5',
    color: RED,
    size: 3,
    row: 3,
    column: 1,
    direction: NONE,
  },
  '2-2': {
    id: 'mid-red-1',
    color: RED,
    size: 2,
    row: 2,
    column: 2,
    direction: NONE,
  },
  '2-3': {
    id: 'mid-red-2',
    color: RED,
    size: 2,
    row: 2,
    column: 3,
    direction: NONE,
  },
  '3-2': {
    id: 'mid-red-3',
    color: RED,
    size: 2,
    row: 3,
    column: 2,
    direction: NONE,
  },
  '1-4': {
    id: 'mid-red-4',
    color: RED,
    size: 2,
    row: 1,
    column: 4,
    direction: NONE,
  },
  '4-1': {
    id: 'mid-red-5',
    color: RED,
    size: 2,
    row: 4,
    column: 1,
    direction: NONE,
  },
  '1-5': {
    id: 'small-red-1',
    color: RED,
    size: 1,
    row: 1,
    column: 5,
    direction: NONE,
  },
  '2-4': {
    id: 'small-red-2',
    color: RED,
    size: 1,
    row: 2,
    column: 4,
    direction: NONE,
  },
  '3-3': {
    id: 'small-red-3',
    color: RED,
    size: 1,
    row: 3,
    column: 3,
    direction: NONE,
  },
  '4-2': {
    id: 'small-red-4',
    color: RED,
    size: 1,
    row: 4,
    column: 2,
    direction: NONE,
  },
  '5-1': {
    id: 'small-red-5',
    color: RED,
    size: 1,
    row: 5,
    column: 1,
    direction: NONE,
  },
  '6-8': {
    id: 'big-blue-1',
    color: BLUE,
    size: 3,
    row: 6,
    column: 8,
    direction: NONE,
  },
  '7-8': {
    id: 'big-blue-2',
    color: BLUE,
    size: 3,
    row: 7,
    column: 8,
    direction: NONE,
  },
  '8-6': {
    id: 'big-blue-3',
    color: BLUE,
    size: 3,
    row: 8,
    column: 6,
    direction: NONE,
  },
  '8-7': {
    id: 'big-blue-4',
    color: BLUE,
    size: 3,
    row: 8,
    column: 7,
    direction: NONE,
  },
  '8-8': {
    id: 'big-blue-5',
    color: BLUE,
    size: 3,
    row: 8,
    column: 8,
    direction: NONE,
  },
  '5-8': {
    id: 'mid-blue-1',
    color: BLUE,
    size: 2,
    row: 5,
    column: 8,
    direction: NONE,
  },
  '6-7': {
    id: 'mid-blue-2',
    color: BLUE,
    size: 2,
    row: 6,
    column: 7,
    direction: NONE,
  },
  '7-6': {
    id: 'mid-blue-3',
    color: BLUE,
    size: 2,
    row: 7,
    column: 6,
    direction: NONE,
  },
  '7-7': {
    id: 'mid-blue-4',
    color: BLUE,
    size: 2,
    row: 7,
    column: 7,
    direction: NONE,
  },
  '8-5': {
    id: 'mid-blue-5',
    color: BLUE,
    size: 2,
    row: 8,
    column: 5,
    direction: NONE,
  },
  '4-8': {
    id: 'small-blue-1',
    color: BLUE,
    size: 1,
    row: 4,
    column: 8,
    direction: NONE,
  },
  '5-7': {
    id: 'small-blue-2',
    color: BLUE,
    size: 1,
    row: 5,
    column: 7,
    direction: NONE,
  },
  '6-6': {
    id: 'small-blue-3',
    color: BLUE,
    size: 1,
    row: 6,
    column: 6,
    direction: NONE,
  },
  '7-5': {
    id: 'small-blue-4',
    color: BLUE,
    size: 1,
    row: 7,
    column: 5,
    direction: NONE,
  },
  '8-4': {
    id: 'small-blue-5',
    color: BLUE,
    size: 1,
    row: 8,
    column: 4,
    direction: NONE,
  },
};

//export const getPyramid = (state, pyramidId) => state.pyramids[pyramidId];
//export const getField = (state, row, column) => state.board[`${row}-${column}`];
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
      const { coords } = payload;
      return coords;
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
      const { coords } = payload;
      return coords;
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

///////////////
// HERE
const targettable = (fullState = initFullState, { type, payload }) => {
  const state = fullState.board.targettable;
  switch (type) {
    case selectSource.type: {
      const { coords } = payload;
      const { direction, size, color, row, column } = fullState.pyramids[
        coords
      ];
      const targettable = [coords];
      if (direction === NONE) {
        return targettable;
      }

      let currRow = row;
      let currColumn = column;
      while (true) {
        const currCoords = move(currRow, currColumn, direction);
        if (currCoords === OFFBOARD) {
          break;
        }
        const currPyramid = fullState.pyramids[currCoords];
        if (!currPyramid) {
          targettable.push(currCoords);
          [currRow, currColumn] = currCoords.split('-');
          continue;
        }
        if (currPyramid.color === color) {
          break;
        }
        if (currPyramid.direction !== NONE || currPyramid.size < size) {
          targettable.push(currCoords);
        }
        break;
      }

      return targettable;
    }
    case selectTarget.type: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const initTargettable = [];

const onPath = (fullState = initFullState, { type, payload }) => {
  const state = fullState.board.onPath;
  switch (type) {
    case selectTarget.type: {
      // FIXME: calculate the new onpath
      const { coords } = payload;
      return ['1-1', '1-4', '3-5'];
    }
    default: {
      return state;
    }
  }
};

const initOnPath = [];

const board = combineReducers({
  targettable,
  onPath,
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
