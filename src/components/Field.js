import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import mergeClassNames from 'classnames';
import { getField } from '../reducers/';
import Pyramid from './Pyramid';
import { selectTarget } from '../actions/';

const Field = ({ row, column }) => {
  const field = useSelector(state => getField(state, row, column), [
    row,
    column,
  ]);
  const { pyramid, targettable } = field;
  const dispatch = useDispatch();
  const selectTargetByRowAndColumn = useCallback(
    () => dispatch(selectTarget({ row, column })),
    [row, column],
  );
  const moveHandler = !targettable ? () => {} : selectTargetByRowAndColumn;

  return (
    <div
      className={mergeClassNames('field', (column + row) % 2 ? 'even' : 'odd', targettable)}
      onClick={moveHandler}
    >
      {pyramid ? (
        <Pyramid pyramidId={pyramid} />
      ) : (
        <Square column={column} row={row} />
      )}
    </div>
  );
};

Field.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  pyramidId: PropTypes.string.isRequired,
};

const Square = ({ column, row }) => <></>;

export default Field;
