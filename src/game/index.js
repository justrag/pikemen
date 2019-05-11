import { N, NE, E, SE, S, SW, W, NW } from '../constants/';
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

  return [row, column];
};
