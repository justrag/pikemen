import { createSelector } from 'reselect';

import { selectAction } from './action';

const RED = 1;
const BLUE = 2;
const NONE = 0;
const N = 1;
const NE = 2;
const E = 3;
const SE = 4;
const S = 5;
const SW = 6;
const W = 7;
const NW = 8;

const initialState = {
  pyramids: [
    { color: RED, size: 3, row: 1, column: 1, direction: SE },
    { color: RED, size: 3, row: 2, column: 1, direction: SE },
    { color: RED, size: 3, row: 3, column: 1, direction: SE },
    { color: RED, size: 3, row: 1, column: 2, direction: SE },
    { color: RED, size: 3, row: 1, column: 3, direction: SE },

    { color: RED, size: 2, row: 2, column: 2, direction: SE },
    { color: RED, size: 2, row: 4, column: 1, direction: SE },
    { color: RED, size: 2, row: 1, column: 4, direction: SE },
    { color: RED, size: 2, row: 2, column: 3, direction: SE },
    { color: RED, size: 2, row: 3, column: 2, direction: SE },

    { color: RED, size: 1, row: 1, column: 5, direction: SE },
    { color: RED, size: 1, row: 2, column: 4, direction: SE },
    { color: RED, size: 1, row: 3, column: 3, direction: SE },
    { color: RED, size: 1, row: 4, column: 2, direction: SE },
    { color: RED, size: 1, row: 5, column: 1, direction: SE },

    { color: BLUE, size: 3, row: 8, column: 8, direction: NW },
    { color: BLUE, size: 3, row: 7, column: 8, direction: NW },
    { color: BLUE, size: 3, row: 8, column: 7, direction: NW },
    { color: BLUE, size: 3, row: 8, column: 6, direction: NW },
    { color: BLUE, size: 3, row: 6, column: 8, direction: NW },

    { color: BLUE, size: 2, row: 5, column: 8, direction: NW },
    { color: BLUE, size: 2, row: 6, column: 7, direction: NW },
    { color: BLUE, size: 2, row: 7, column: 7, direction: NW },
    { color: BLUE, size: 2, row: 7, column: 6, direction: NW },
    { color: BLUE, size: 2, row: 8, column: 5, direction: NW },

    { color: BLUE, size: 1, row: 4, column: 8, direction: NW },
    { color: BLUE, size: 1, row: 5, column: 7, direction: NW },
    { color: BLUE, size: 1, row: 6, column: 6, direction: NW },
    { color: BLUE, size: 1, row: 7, column: 5, direction: NW },
    { color: BLUE, size: 1, row: 8, column: 4, direction: NW },

  ],
  player: RED,
  turn: 1,
  selected: false,
};
//const range = size => Array.from({ length: size }, (val, idx) => idx + 1);

const getPyramids = state => state.pyramids;
const getPlayer = state => state.player;
const getTurn = state => state.turn;
const getSelected = state => state.selected;

const getBoard = createSelector(
  getPyramids,
  pyramids => {
    const board = Array.from({ length: 8 }, (val2, row) =>
      Array.from({ length: 8 }, (val1, column) => ({
        row: row + 1,
        column: column + 1,
      })),
    );
    pyramids.forEach(p => {
      board[p.row - 1][p.column - 1] = p;
    });
    return board;
  },
);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case selectAction.type: {
      const { row, column } = payload;
      return { ...state, selected: { row, column } };
    }
    default: {
      return state;
    }
  }
};

export { reducer, initialState, getBoard, getPlayer, getSelected, getTurn };
