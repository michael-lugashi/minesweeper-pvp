import React, { useRef, useState } from 'react';
import socketContext from './socket-context';

const SocketRef = (props) => {
 const socketConnection = useRef(null);
 const [roomId, setRoomId] = useState(null);
 return (
  <socketContext.Provider value={{ socketConnection, roomId, setRoomId }}>
   {props.children}
  </socketContext.Provider>
 );
};

export default SocketRef;
