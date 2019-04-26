import React, { useReducer } from 'react';
import './App.css';
import { reducer, initialState, getBoard, NONE } from './reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const board = getBoard(state);
  return (
    <div className="frame">
      <div className="chessboard">
        {board.map(row => row.map(field => <Field {...field} />))}
      </div>
    </div>
  );
};

const Field = ({ column, row, color, size, direction }) => (
  <div className={`field ${(column + row) % 2 ? 'even' : 'odd'}`}>
    {size ? (
      <Pyramid color={color} size={size} direction={direction} />
    ) : (
      <Square column={column} row={row} />
    )}
  </div>
);

const Pyramid = ({ color, size, direction }) => (
  <span className={`color-${color} size-${size} direction-${direction}`}>
    <Dots size={size} />
    {direction !== 'NONE' && <>&#8658;</>}
  </span>
);

const Dots = ({ size }) => <>{'O'.repeat(size)}</>;

const Square = ({ column, row }) => <></>;

export default App;
