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

io.on('connection', (socket) => {
  console.log('New WebSocket connection established');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('message', (data) => {
    const { roomId, message } = data;
    
    // Broadcast the message to all participants in the room
    socket.to(roomId).emit('message', data);
    console.log(`Message received from ${socket.id} in room ${roomId}: ${message}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket connection closed');
  });
});

server.listen(8000, () => {
  console.log('Socket.IO server is running on port 8000');
});
