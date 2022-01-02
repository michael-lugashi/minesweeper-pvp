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

io.on('connection', (socket) => {
 userPair.push(socket.id);
 console.log(userPair);
 checkUserPair(socket);
 //  socket.on('message', ({ name, message }) => {
 //   io.emit('messageBack', { name, message });
 //  });
 socket.on('square-move', ({ rowNum, colNum, roomId }) => {
  console.log(rowNum + '_' + colNum);
  socket
   .to(roomId)
   .emit('update-opponent-grid', { grid: rowNum + 'opp' + colNum });
  io.to(socket.id).emit('update-grid', { gird: rowNum + 'your' + colNum });
 });

 socket.on('disconnect', () => {
  socket.emit('messageBack', { message: 'disconnected' });
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
  const grid = generateBoard(8, 10, 10);
  //   io.in(_roomId).emit('update-grid', { grid });
  setTimeout(() => {
   io.sockets.in(_roomId).emit('update-grid', { grid });
   //   io.to(socket.id).emit('update-grid', { grid });
   //   io.to(pair[0]).emit('update-grid', { grid });
   //   io.to(pair[1]).emit('update-grid', { grid });
   io.to(_roomId).emit('update-opponent-grid', { grid }); 
  }, 1000);
 }
};
