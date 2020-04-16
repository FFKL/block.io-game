const express = require('express');
const app = express();
const server = app.listen(3001);
const io = require('socket.io')(server);

app.use(express.static('public/dist'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/dist/index.html`);
});

io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
        io.to(room).emit('message', 'Welcome to ' + room)
    })
});
