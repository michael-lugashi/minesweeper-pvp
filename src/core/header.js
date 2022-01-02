import React, { useContext, useEffect, useState } from 'react';
import '../styles/header.css';
import io from 'socket.io-client';
import socketContext from '../contexts/socket-connection/socket-context';
import swal from 'sweetalert';

function Header(props) {
 const [inGame, setInGame] = useState(false);
 const [gameStarted, setGameStarted] = useState(false);
 const [seconds, setSeconds] = useState(5);
 const { socketConnection, roomId, setRoomId } = useContext(socketContext);
 React.useEffect(() => {
  if (inGame) {
   socketConnection.current = io.connect('');
   socketConnection.current.on('connect', () => {
   });

   socketConnection.current.on('joined-room', ({ _roomId }) => {
    setRoomId(_roomId);
    // console.log('joined Room:' + _roomId);
   });

   socketConnection.current.on('disconnect', () => {
    setRoomId(null);
    setSeconds(5);
    setInGame(false);
    setGameStarted(false);
   });
   socketConnection.current.on('update-grid', () => {
    setGameStarted(true);
   });

   socketConnection.current.on('update-time', ({ _seconds }) => {
    setSeconds(() => _seconds);
   });
  }
 }, [inGame]);

React.useEffect(() => {
  if (inGame) {
   socketConnection.current.on('you-lost', () => {
    swal('You Lost!', 'Better luck next time!', 'error');
    socketConnection.current.emit('gameOver');
   });
   socketConnection.current.on('you-won', ({ type }) => {
    if (type === 'completion') {
     swal('You Won!', `It took you ${seconds} seconds!`, 'success');
    } else {
     swal('You Won!', 'Take cover! Your opponents mine went off!', 'success');
    }
    socketConnection.current.emit('gameOver');
   });
  }
 }, [inGame, seconds]);

 React.useEffect(() => {
  let secondIntervalId = null;
  if (gameStarted) {
   secondIntervalId = setInterval(() => {
    setSeconds((lastSecond) => lastSecond + 1);
   }, 1000);
  } else {
   clearInterval(secondIntervalId);
  }
  return () => clearInterval(secondIntervalId);
 }, [gameStarted]);

 return (
  <header className="header">
   <h1 className="title-page">Minesweeper PvP 💣</h1>

   {roomId ? (
    <div className="timer">
     {gameStarted ? `⏳ ${seconds}` : `Game Starting in ${seconds}`}
    </div>
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
