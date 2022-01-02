import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/header.css';
import io from 'socket.io-client';
import socketContext from '../contexts/socket-connection/socket-context';

function Header(props) {
 //  const socketRef = useRef();
 const [inGame, setInGame] = useState(false);
 const { socketConnection, setRoomId } = useContext(socketContext);
 useEffect(() => {
  if (inGame) {
   socketConnection.current = io.connect('http://localhost:8080');
   socketConnection.current.on('connect', () => {
    console.log('connect');
   });
   socketConnection.current.on('joined-room', ({ _roomId }) => {
    setRoomId(_roomId);
    console.log('joined Room:' + _roomId);
   });
  }
 }, [inGame]);
 return (
  <header className="header">
   <h1 className="title-page">Minsweeper PvP 💣</h1>
   <button
    onClick={() => {
     setInGame(true);
    }}
   >
    Find Game
   </button>
  </header>
 );
}

export default Header;
