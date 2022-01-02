import React, { useContext, useState } from 'react';
import '../styles/board.css';
import YourSquare from './your-square';
import socketContext from '../contexts/socket-connection/socket-context';
import { useEffect, useCallback } from 'react/cjs/react.development';

function YourGrid(props) {
 const [grid, setGrid] = useState(Array(8).fill(Array(10).fill({})));
 const { socketConnection, roomId } = useContext(socketContext);

 useEffect(() => {
  if (roomId) {
   socketConnection.current.on('update-grid', ({grid}) => {
    console.log(grid);
    setGrid([...grid]);
   });
  }
 }, [socketConnection, roomId]);

 return (
  <div className="grid">
   {grid.map((rowOfSquares, rowNum) => {
    return rowOfSquares.map((square, colNum) => {
     return (
      <YourSquare
       square={square}
       rowNum={rowNum}
       colNum={colNum}
       grid={grid}
       key={`${rowNum}_${colNum}`}
      />
     );
    });
   })}
  </div>
 );
}

export default YourGrid;
