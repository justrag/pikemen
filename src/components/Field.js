import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useTrackedState } from 'reactive-react-redux';

import mergeClassNames from 'classnames';

import { getTarget, getIsMoveReady, getField } from '../reducers/';
import { selectTarget, selectDirection, performMove } from '../actions/';

import Pyramid from './Pyramid';
import { NONE, N, NE, E, SE, S, SW, W, NW } from '../constants/';

const Field = ({ row, column }) => {
  const store = useTrackedState();
  const target = getTarget(store);
  const isMoveReady = getIsMoveReady(store);
  const { pyramid, isTargettable, isOnPath } = getField(store, row, column);

  const isEven = (column + row) % 2 ? 'even' : 'odd';
  const isOccupied = !!pyramid;
  const isSelectedTarget =
    target && row === target.row && column === target.column;
  const fieldClasses = mergeClassNames(
    'field',
    isEven ? 'even' : 'odd',
    { targettable: isTargettable },
    { target: isSelectedTarget },
    { onpath: isOnPath },
  );

  const dispatch = useDispatch();
  const selectTargetByRowAndColumn = useCallback(
    () => dispatch(selectTarget({ row, column })),
    [row, column],
  );
  const onClick = !isTargettable ? selectTargetByRowAndColumn : null;

  return (
    <div className={fieldClasses} onClick={onClick}>
      {isOccupied && <Pyramid pyramidId={pyramid} />}
      {isSelectedTarget && <SelectDirection />}
      {isSelectedTarget && isMoveReady && <PerformMove />}
    </div>
  );
};

const SelectDirection = () => {
  const dispatch = useDispatch();
  return (
    <>
      {[NONE, N, NE, E, SE, S, SW, W, NW].map(direction => (
        <span
          key={direction}
          onClick={() => dispatch(selectDirection(direction))}
        >
          {direction}
        </span>
      ))}
    </>
  );
};

const PerformMove = () => {
  const dispatch = useDispatch();
  const performMoveNow = useCallback(() => dispatch(performMove()));

  return <span onClick={performMoveNow}>MOVE</span>;
};

Field.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default Field;
