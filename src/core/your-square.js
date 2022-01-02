import React, { useContext } from 'react';
import socketContext from '../contexts/socket-connection/socket-context';

function YourSquare({
 square: { isFlagged, isRevealed, value, isStartingSquare },
 rowNum,
 colNum,
 grid,
 firstClick,
 setFirstClick,
}) {
 const { socketConnection, roomId } = useContext(socketContext);
 const gridColorDecider = (rowNum, colNum) => {
  const sum = rowNum + colNum;
  return sum % 2;
 };

 const display = (isFlagged, isRevealed, value) => {
  if (!roomId) {
   if (value === '💣' && isFlagged) {
    return '🚩';
   }
   if (value === '💣') {
    return '💣';
   }
   if (isFlagged) {
    return '❌';
   }
  }

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
      } ${isRevealed && value ? 'value' + value : ''}
      ${isStartingSquare ? 'starting-square' : ''}`}
   onClick={() => {
    if (firstClick && !isStartingSquare) {
     return;
    }

    if (roomId && !isRevealed) {
     setFirstClick(false);
     console.log('click');
     socketConnection.current.emit('square-move', {
      grid,
      rowNum,
      colNum,
      roomId,
     });
    }
   }}
   onContextMenu={(e) => {
    e.preventDefault();
    if (roomId && !isRevealed && !firstClick) {
     socketConnection.current.emit('flag-square', {
      grid,
      rowNum,
      colNum,
      roomId,
     });
    }
   }}
  >
   {display(isFlagged, isRevealed, value)}
  </div>
 );
}

export default YourSquare;
