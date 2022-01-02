const { instrument } = require('@socket.io/admin-ui');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
 cors: {
  origin: [
   'http://localhost:3001',
   'http://localhost:3000',
   'https://admin.socket.io',
  ],
  credentials: true,
 },
});
instrument(io, { auth: false });
const port = 8080;
const userPair = [];
const { nanoid } = require('nanoid');
const generateBoard = require('./utils/generateBoard');
const updateGrid = require('./utils/update-grid');

io.on('connection', (socket) => {
 userPair.push(socket.id);
 console.log(userPair);
 checkUserPair(socket);
 //  socket.on('message', ({ name, message }) => {
 //   io.emit('messageBack', { name, message });
 //  });
 socket.on('square-move', ({ grid, rowNum, colNum, roomId }) => {
  const updatedGrid = updateGrid(grid, rowNum, colNum);
  socket
   .to(roomId)
   .emit('update-opponent-grid', { grid: updatedGrid, type: 'click' });
  io.to(socket.id).emit('update-grid', { grid: updatedGrid, type: 'click' });

  const gameStatus = checkGameOver(updatedGrid);
  if (gameStatus === 'lost') {
   socket.to(roomId).emit('you-won', { type: 'mine' });
   io.to(socket.id).emit('you-lost');
  }

  if (gameStatus === 'won') {
   socket.to(roomId).emit('you-lost');
   io.to(socket.id).emit('you-won', { type: 'completion' });
  }
 });

 socket.on('flag-square', ({ grid, rowNum, colNum, roomId }) => {
  grid[rowNum][colNum].isFlagged = !grid[rowNum][colNum].isFlagged;
  socket.to(roomId).emit('update-opponent-grid', {
   grid,
   type: 'flag',
   addedFlag: grid[rowNum][colNum].isFlagged,
  });
  io.to(socket.id).emit('update-grid', {
   grid,
   type: 'flag',
   addedFlag: grid[rowNum][colNum].isFlagged,
  });
 });
 socket.on('gameOver', () => {
  console.log('disconnect');
  socket.disconnect(0);
 });
});

http.listen(port, () => {
 console.log(`listening on port ${port}`);
});

const checkUserPair = (socket) => {
 if (userPair.length >= 2) {
  const pair = userPair.splice(0, 2);
  const _roomId = nanoid();
  io.in([pair[0], pair[1]]).socketsJoin(_roomId);
  io.to(_roomId).emit('joined-room', { _roomId });
  //   const grid = generateBoard(8, 10, 10);
  //   io.in(_roomId).emit('update-grid', { grid });
  startGame(_roomId);
  //   setTimeout(() => {
  //    io.sockets.in(_roomId).emit('update-grid', { grid });
  //    io.to(_roomId).emit('update-opponent-grid', { grid });
  //   }, 5000);
 }
};

const startGame = (_roomId, untilStart = 5) => {
 setTimeout(() => {
  if (untilStart === 0) {
   const grid = generateBoard(8, 10, 10);
   io.to(_roomId).emit('update-grid', { grid });
   io.to(_roomId).emit('update-opponent-grid', { grid });
  } else {
   io.to(_roomId).emit('update-time', { _seconds: --untilStart });
   startGame(_roomId, untilStart);
  }
 }, 1000);
};

const checkGameOver = (grid) => {
 const flattendBoard = grid.flat();
 let numOfRevealed = 0;
 for (const square of flattendBoard) {
  if (square.isRevealed && square.value === '💣') {
   return 'lost';
  }
  if (square.isRevealed) {
   numOfRevealed++;
  }
  if (numOfRevealed === 70) {
   return 'won';
  }
 }
};
