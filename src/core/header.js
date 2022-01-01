import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/header.css';
import io from 'socket.io-client';
import socketContext from '../contexts/socket-connection/socket-context';

function Header(props) {
//  const socketRef = useRef();
 const [inGame, setInGame] = useState(false);
 const socketConnection = useContext(socketContext)
 useEffect(() => {
  if (inGame) {
   socketConnection.current = io.connect('http://localhost:8080');
   socketConnection.current.on('messageBack', ({ name, message }) => {
    console.log(name, message);
   });
   socketConnection.current.on('connect', () => {
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
  </header>
 );
}

export default Header;
