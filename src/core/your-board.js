import React, { useContext } from 'react';
import YourHeader from './your-header';
import YourGrid from './your-grid';
import socketContext from '../contexts/socket-connection/socket-context';

function YourBoard(props) {
    const socketConnection = useContext(socketContext)
 return (
  <div className='board'>
        <button
    onClick={() => {
     socketConnection.current.emit('message', { name: 'todd', message: 'wow' });
    }}
   >
    emmit
   </button>
   <YourHeader />
   <YourGrid />
  </div>
 );
}

export default YourBoard;
