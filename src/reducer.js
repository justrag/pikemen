import { createSelector } from 'reselect';

const RED = 'red';
const BLUE = 'blue';
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
    { color: RED, size: 3, row: 2, column: 5, direction: E },
    { color: RED, size: 1, row: 1, column: 5, direction: NE },
    { color: BLUE, size: 2, row: 2, column: 4, direction: NONE },
  ],
};
//const range = size => Array.from({ length: size }, (val, idx) => idx + 1);

const pyramidsSelector = state => state.pyramids;

const getBoard = createSelector(
  pyramidsSelector,
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

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': {
      return { ...state, count: state.count + 1, loading: false };
    }
    case 'decrement': {
      return { ...state, count: state.count - 1, loading: false };
    }
    case 'loading': {
      return { ...state, loading: true };
    }
    default: {
      return state;
    }
  }
};

export { reducer, initialState, getBoard };
