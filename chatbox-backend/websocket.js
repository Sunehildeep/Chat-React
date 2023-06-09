const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

var users = {};

io.on('connection', (socket) => {
  console.log('New WebSocket connection established');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
    console.log(socket.rooms)
  });

  socket.on('connectId', (userId) => {
    users[userId] = socket.id;
    console.log(`Socket ${socket.id} connected with user id ${userId}`);
  });

  socket.on('message', (data) => {
    const { roomId, message } = data;

    // Broadcast the message to all participants in the room
    io.sockets.in(roomId).emit('message', data);
    io.sockets.in(roomId).emit('updateLastMessage', message);
    console.log(`Message received from ${socket.id} in room ${roomId}: ${message}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket connection closed');
  });

  socket.on('refresh', (user1, user2) => {
    console.log(`Refresh request received from ${socket.id} for users ${user1} and ${user2}`);

    // Get the socket which has id == userId
    const sender = io.sockets.sockets.get(users[user1]);
    const receiver = io.sockets.sockets.get(users[user2]);

    sender.emit('refresh');
    receiver.emit('refresh');
  });

});

server.listen(8000, () => {
  console.log('Socket.IO server is running on port 8000');
});
