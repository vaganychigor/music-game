const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Клиент подключился');

  socket.on('playTrack', (trackName) => {
    console.log(`Проигрывается: ${trackName}`);
    // Отправка всем клиентам, кроме отправителя
    socket.broadcast.emit('playTrack', trackName);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
