import React from 'react';
import { useActions } from 'react-redux';
import mergeClassNames from 'classnames';
import './App.css';
import Pyramid from './Pyramid';
import { movePyramid } from '../actions/';

const Field = ({ column, row, color, size, direction, target }) => {
  const movePyramidToRowAndColumn = useActions(
    () => movePyramid({ row, column }),
    [],
  );

  const moveHandler = target ? movePyramidToRowAndColumn : undefined;

  return (
    <div
      className={mergeClassNames('field', (column + row) % 2 ? 'even' : 'odd')}
      onClick={moveHandler}
    >
      {size ? (
        <Pyramid
          column={column}
          row={row}
          color={color}
          size={size}
          direction={direction}
        />
      ) : (
        <Square column={column} row={row} />
      )}
    </div>
  );
};

const Square = ({ column, row }) => <></>;

export default Field;
