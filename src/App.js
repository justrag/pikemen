import React, { useReducer } from 'react';
import './App.css';
import {
  reducer,
  initialState,
  getBoard,
  getPlayer,
  getTurn,
  getSelected,
  NONE,
} from './reducer';
import { selectAction } from './action';

const App = () => {
  const [state, origDispatch] = useReducer(reducer, initialState);

  const dispatch = action => {
    console.log({ ...action });
    return origDispatch(action);
  };

  const board = getBoard(state);
  const player = getPlayer(state);
  const selected = getSelected(state);
  return (
    <div className="frame">
      <div className="chessboard">
        {board.map(row =>
          row.map(field => (
            <Field
              {...field}
              player={player}
              selected={selected}
              dispatch={dispatch}
            />
          )),
        )}
      </div>
    </div>
  );
};

const Field = ({
  column,
  row,
  color,
  size,
  direction,
  player,
  selected,
  dispatch,
}) => {
  const selectHandler = () => dispatch(selectAction({ row, column }));
  return (
    <div className={`field ${(column + row) % 2 ? 'even' : 'odd'}`}>
      {size ? (
        <Pyramid
          color={color}
          size={size}
          direction={direction}
          player={player}
          selected={
            selected && selected.row === row && selected.column === column
          }
          selectHandler={player === color ? selectHandler : undefined}
        />
      ) : (
        <Square column={column} row={row} />
      )}
    </div>
  );
};

const Pyramid = ({
  color,
  size,
  direction,
  player,
  selected,
  selectHandler,
}) => (
  <span
    className={`${
      selected ? 'selected' : ''
    } color-${color} size-${size} direction-${direction} ${
      player === color ? 'movable' : ''
    }`}
    onClick={selectHandler}
  >
    <Dots size={size} />
    {direction !== 'NONE' && <>&#8658;</>}
  </span>
);

const Dots = ({ size }) => <>{'O'.repeat(size)}</>;

const Square = ({ column, row }) => <></>;

export default App;
