import React, { useContext } from 'react';
import socketContext from '../contexts/socket-connection/socket-context';

function YourSquare({
 square: { isFlagged, isRevealed, value },
 rowNum,
 colNum,
}) {
 const { socketConnection, roomId } = useContext(socketContext);
 const gridColorDecider = (rowNum, colNum) => {
  const sum = rowNum + colNum;
  return sum % 2;
 };

 const display = (isFlagged, isRevealed, value) => {
  // if (gameIsLost) {
  //  if (value === '💣' && isFlagged) {
  //   return '🚩';
  //  }
  //  if (value === '💣') {
  //   return '💣';
  //  }
  //  if (isFlagged) {
  //   return '❌';
  //  }
  // }

  if (isFlagged) {
   return '🚩';
  }

  if (isRevealed && value) {
   return value;
  }

  return null;
 };

 return (
  <div
   className={`square ${
    gridColorDecider(rowNum, colNum) ? 'patchedEven' : 'patchedOdd'
   }
      ${
       isRevealed
        ? gridColorDecider(rowNum, colNum)
          ? 'revealedEven'
          : 'revealedOdd'
        : ''
      } ${isRevealed && value ? 'value' + value : ''}`}
   onClick={() => {
    if (socketConnection.current) {
     socketConnection.current.emit('square-move', { rowNum, colNum, roomId });
    }
   }}
  >
   {display(isFlagged, isRevealed, value)}
  </div>
 );
}

export default YourSquare;
