import { N, NE, E, SE, S, SW, W, NW } from '../constants/';
export const move = (row, column, direction) => {
  switch (direction) {
    case N: {
      column -= 1;
      break;
    }
    case NE: {
      column -= 1;
      row += 1;
      break;
    }
    case E: {
      row += 1;
      break;
    }
    case SE: {
      column += 1;
      row += 1;
      break;
    }
    case S: {
      column += 1;
      break;
    }
    case SW: {
      column += 1;
      row -= 1;
      break;
    }
    case W: {
      row -= 1;
      break;
    }
    case NW: {
      column += 1;
      row -= 1;
      break;
    }
    default: {
      //
    }
  }

  return [row, column];
};
