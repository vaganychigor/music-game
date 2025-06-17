// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Статические файлы из папки public
app.use(express.static('public'));

// Обработка подключений по WebSocket
io.on('connection', (socket) => {
  console.log('Клиент подключился');

  socket.on('playTrack', (trackName) => {
    console.log(`Хост запускает: ${trackName}`);
    // Отправить ВСЕМ остальным клиентам сигнал на проигрывание
    socket.broadcast.emit('playTrack', trackName);
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
