import React from 'react';
import './App.css';
import Pyramid from './Pyramid';

const Field = ({ column, row, color, size, direction }) => {
  return (
    <div className={`field ${(column + row) % 2 ? 'even' : 'odd'}`}>
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
