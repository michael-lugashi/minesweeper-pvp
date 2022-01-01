import React, { useRef } from 'react';
import socketContext from './socket-context';

const SocketRef = (props) => {
 const socketConnection = useRef(null);

 return (
  <socketContext.Provider value={socketConnection}>
   {props.children}
  </socketContext.Provider>
 );
};

export default SocketRef;
