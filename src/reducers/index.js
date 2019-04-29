import { selectPyramid, movePyramid } from '../actions/';
import { RED, BLUE, NONE, N, NE, E, SE, S, SW, W, NW } from '../constants/';
import { move } from '../game/';

export const initialState = {
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

export const getPyramids = state => state.pyramids;
export const getPlayer = state => state.player;
export const getTurn = state => state.turn;
export const getSelected = state => state.selected;

export const getBoard = (pyramids, selected) => {
  const board = Array.from({ length: 8 }, (val2, row) =>
    Array.from({ length: 8 }, (val1, column) => ({
      row: row + 1,
      column: column + 1,
    })),
  );
  pyramids.forEach(p => {
    board[p.row - 1][p.column - 1] = { ...p };
  });

  if (selected) {
    let { row, column } = selected;
    const direction = board[row - 1][column - 1].direction;

    if (direction !== NONE) {
      while (true) {
        [row, column] = move(row, column, direction);
        console.log({ row, column });
        if (
          row < 0 ||
          row > 7 ||
          column < 0 ||
          column > 7 ||
          board[row - 1][column - 1].size
        ) {
          break;
        }
        board[row - 1][column - 1].target = true;
      }
    }
  }
  return board;
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case selectPyramid.type: {
      const { row, column } = payload;
      return { ...state, selected: { row, column } };
    }
    case movePyramid.type: {
      const { row, column } = payload;
      console.log({ moveTo: true, row, column });
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
