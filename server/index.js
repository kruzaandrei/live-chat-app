const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*' },
});

let messages = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  // Send existing messages to the new client
  socket.emit('messages', messages);

  socket.on('message', (message) => {
    messages.push(message);
    io.emit('message', message);
  });

  socket.on('deleteMessage', (messageId) => {
    messages = messages.filter((msg) => msg.id !== messageId);
    io.emit('deleteMessage', messageId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Socket.io server running on port 3000');
});
