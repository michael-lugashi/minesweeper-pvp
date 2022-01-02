const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
 cors: {
  origin: ['http://localhost:3001', 'http://localhost:3000'],
 },
});
const port = 8080;
const userPair = [];
const { nanoid } = require('nanoid');

io.on('connection', (socket) => {
 userPair.push(socket.id);
 console.log(userPair);
 checkUserPair();
 //  socket.on('message', ({ name, message }) => {
 //   io.emit('messageBack', { name, message });
 //  });
 socket.on('square-move', ({ rowNum, colNum, roomId }) => {
  console.log(rowNum + '_' + colNum);
  io.in(roomId).emit('update-grid', { grid: rowNum + '_' + colNum });
 });

 socket.on('disconnect', () => {
  io.emit('messageBack', { message: 'disconnected' });
 });
});

http.listen(port, () => {
 console.log(`listening on port ${port}`);
});

const checkUserPair = () => {
 if (userPair.length >= 2) {
  const pair = userPair.splice(0, 2);
  const _roomId = nanoid();
  io.in([pair[0], pair[1]]).socketsJoin(_roomId);
  io.to([pair[0], pair[1]]).emit('joined-room', { _roomId });
 }
};
