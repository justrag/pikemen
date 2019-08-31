import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import mergeClassNames from 'classnames';

import { getPlayer, getSource, getPyramid } from '../reducers/';
import { NONE } from '../constants/';
import { selectSource } from '../actions/';

const Pyramid = ({ pyramidId }) => {
  const store = useTrackedState();
  const { color, size, direction } = getPyramid(store, pyramidId);
  const source = getSource(store);
  const player = getPlayer(store);

  const isStandingUp = direction !== NONE;
  const isSelectedSource = pyramidId === source;
  const isMovable = player === color;

  const pyramidClasses = mergeClassNames(
    { source: isSelectedSource },
    { movable: isMovable },
    `color-${color}`,
    `size-${size}`,
    `direction-${direction}`,
  );

  const dispatch = useDispatch();
  const selectSourceByRowAndColumn = useCallback(
    () => dispatch(selectSource({ pyramidId })),
    [pyramidId],
  );
  const onClick = isMovable ? selectSourceByRowAndColumn : null;

  return (
    <span className={pyramidClasses} onClick={onClick}>
      <Dots size={size} />
      {isStandingUp && <>&#8658;</>}
    </span>
  );
};

const Dots = ({ size }) => <>{'O'.repeat(size)}</>;
Dots.propTypes = {
  size: PropTypes.number.isRequired,
};

Pyramid.propTypes = {
  pyramidId: PropTypes.string.isRequired,
};
export default Pyramid;
