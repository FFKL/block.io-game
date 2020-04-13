const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(3001, () => {
    console.log('listening on *:3001');
});

io.on('connection', function(socket){
    console.log('a user connected');
});
