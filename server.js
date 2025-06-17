const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('playTrack', file => {
    socket.broadcast.emit('playTrack', file);
  });

  socket.on('scoreUpdate', score => {
    socket.broadcast.emit('scoreUpdate', score);
  });

  socket.on('nameUpdate', name => {
    socket.broadcast.emit('nameUpdate', name);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
