import React from 'react';
import '../styles/board.css';
import YourSquare from './your-square';

function YourGrid(props) {
 const initialgrid = Array(8).fill(Array(10).fill({}));

 return (
  <div className='grid'>
   {initialgrid.map((rowOfSquares, rowNum) => {
    return rowOfSquares.map((square, colNum) => {
     return <YourSquare square={square} rowNum={rowNum} colNum={colNum} key={`${rowNum}_${colNum}`}/>;
    });
   })}
  </div>
 );
}

export default YourGrid;
