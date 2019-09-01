import { N, E, S, W, OFFBOARD } from '../constants/';
export const move = (row, column, direction) => {
  if (direction.includes(N)) {
    row -= 1;
  }
  if (direction.includes(S)) {
    row += 1;
  }
  if (direction.includes(E)) {
    column += 1;
  }
  if (direction.includes(W)) {
    column -= 1;
  }

  if (row < 1 || row > 8 || column < 1 || column > 8) {
    return OFFBOARD;
  }

  return `${row}-${column}`;
};
