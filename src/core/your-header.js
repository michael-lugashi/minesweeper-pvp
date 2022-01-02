import React, { useEffect, useContext, useState } from 'react';
import socketContext from '../contexts/socket-connection/socket-context';

function YourHeader(props) {
 const { socketConnection, roomId } = useContext(socketContext);
 const [flagCount, setFlagCount] = useState(10);

 React.useEffect(() => {
  if (roomId) {
   socketConnection.current.on('update-grid', ({ type, addedFlag }) => {
    if (type === 'flag') {
     if (addedFlag) {
      setFlagCount((lastCount) => lastCount - 1);
     } else {
      setFlagCount((lastCount) => lastCount + 1);
     }
    }
   });
   socketConnection.current.on('disconnect', () => {
    setFlagCount(10);
   });
  }
 }, [socketConnection, roomId]);

 return (
  <div className="board-header">
   <h3 className="board-heading">Your board</h3>
   <div className="flag-count">🚩 {flagCount}</div>
  </div>
 );
}

export default YourHeader;
