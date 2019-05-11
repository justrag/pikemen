import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import mergeClassNames from 'classnames';
import './App.css';
import Pyramid from './Pyramid';
import { movePyramid } from '../actions/';

const Field = ({ column, row, color, size, direction, target }) => {
  const dispatch = useDispatch();
  const movePyramidToRowAndColumn = useCallback(
    () => dispatch(movePyramid({ row, column })),
    [row, column],
  );
  const moveHandler = !target ? () => {} : movePyramidToRowAndColumn;

  return (
    <div
      className={mergeClassNames('field', (column + row) % 2 ? 'even' : 'odd')}
      onClick={() => moveHandler()}
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

Field.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  direction: PropTypes.number.isRequired,
  target: PropTypes.bool.isRequired,
};

const Square = ({ column, row }) => <></>;

export default Field;
