import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Field from './Field';
import { getBoard, getPyramids, getSelected } from '../reducers/';

const App = () => {
  const pyramids = useSelector(getPyramids);
  const selected = useSelector(getSelected);
  const board = useMemo(() => getBoard(pyramids, selected), [
    pyramids,
    selected,
  ]);

  return (
    <div className="frame">
      <div className="chessboard">
        {board.map((row, rowIndex) =>
          row.map((field, colIndex) => (
            <Field key={`${rowIndex}${colIndex}`} {...field} />
          )),
        )}
      </div>
    </div>
  );
};

export default App;
