const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://localhost:3001', 'http://localhost:3000']
    }
});
const port = 8080;

io.on('connection', (socket) => {
 socket.on('message', ({ name, message }) => {
  io.emit('messageBack', { name, message });
 });

 socket.on('disconnect', () => {
  io.emit('messageBack', { message: 'disconnected' });
 });
});

http.listen(port, () => {
 console.log(`listening on port ${port}`);
});
