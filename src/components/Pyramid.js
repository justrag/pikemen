import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import mergeClassNames from 'classnames';
import { getPlayer, getSource, getPyramid } from '../reducers/';
import { NONE } from '../constants/';
import { selectSource } from '../actions/';

const Pyramid = ({ pyramidId }) => {
  const pyramid = useSelector(state => getPyramid(state, pyramidId), [
    pyramidId,
  ]);
  const { size, color, direction } = pyramid;
  const source = useSelector(getSource);
  const player = useSelector(getPlayer);
  const dispatch = useDispatch();

  const selectSourceByRowAndColumn = useCallback(
    () => dispatch(selectSource({ pyramidId })),
    [pyramidId],
  );
  const selectHandler =
    player === color ? selectSourceByRowAndColumn : () => {};

  const classnames = mergeClassNames(
    {
      source: source === pyramidId,
      movable: player === color,
    },
    `color-${color}`,
    `size-${size}`,
    `direction-${direction}`,
  );

  return (
    <span className={classnames} onClick={selectHandler}>
      <Dots size={size} />
      {direction !== NONE && <>&#8658;</>}
    </span>
  );
};

const Dots = ({ size }) => <>{'O'.repeat(size)}</>;

export default Pyramid;
