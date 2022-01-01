import React, { useEffect, useRef, useState } from 'react';
import '../styles/header.css';
import io from 'socket.io-client';

function Header(props) {
 const socketRef = useRef();
 const [inGame, setInGame] = useState(false);
 useEffect(() => {
  if (inGame) {
   socketRef.current = io.connect('http://localhost:8080');
   socketRef.current.on('messageBack', ({ name, message }) => {
    console.log(name, message);
   });
   socketRef.current.on('connect', () => {
    console.log('connect');
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
   <button
    onClick={() => {
     socketRef.current.emit('message', { name: 'todd', message: 'wow' });
    }}
   >
    emmit
   </button>
  </header>
 );
}

export default Header;
