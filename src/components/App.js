import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Field from './Field';
import { getBoard, getPyramids } from '../reducers/';

const App = () => {
  const pyramids = useSelector(getPyramids);
  const board = useMemo(() => getBoard(pyramids), [pyramids]);

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
