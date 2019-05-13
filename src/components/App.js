import React from 'react';
import './App.css';
import Field from './Field';
import range from '../lib/range'

const rows = range(1, 8);
const columns = range(1, 8);

const App = () => {
  return (
    <div className="frame">
      <div className="chessboard">
        {rows.map(row =>
          columns.map(column => (
            <Field key={`${row}${column}`} row={row} column={column} />
          )),
        )}
      </div>
    </div>
  );
};

export default App;
