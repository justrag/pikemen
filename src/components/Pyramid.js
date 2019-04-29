import React from 'react';
import { useSelector, useActions } from 'react-redux';
import classNames from 'classnames';
import './App.css';
import { getPlayer, getSelected } from '../reducers/';
import { NONE } from '../constants/';
import { selectPyramid } from '../actions/';

const Pyramid = ({ column, row, color, size, direction }) => {
  const selected = useSelector(getSelected);
  const player = useSelector(getPlayer);
  const selectPyramidByRowAndColumn = useActions(
    () => selectPyramid({ row, column }),
    [],
  );

  const selectHandler =
    player === color ? selectPyramidByRowAndColumn : undefined;

  const classnames = classNames(
    {
      selected: selected && selected.row === row && selected.column === column,
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
