import React, { useContext, useEffect, useState } from 'react';
import '../styles/header.css';
import io from 'socket.io-client';
import socketContext from '../contexts/socket-connection/socket-context';

function Header(props) {
 const [inGame, setInGame] = useState(false);
 const { socketConnection, roomId, setRoomId } = useContext(socketContext);
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
   socketConnection.current.on('disconnect', () => {
    console.log('disconnect');
   });
  }
 }, [inGame]);

 

 return (
  <header className="header">
   <h1 className="title-page">Minsweeper PvP 💣</h1>

   {roomId ? (
    <div className="timer">⏳ 0</div>
   ) : (
    <button
     className="join-game"
     onClick={(e) => {
      setInGame(true);
      e.target.innerText = 'Waiting for player...';
     }}
    >
     Find Game
    </button>
   )}

  </header>
 );
}

export default Header;
