import express from "express";
import path from "path";
import generateId from "uid";
import socketIO from 'socket.io';

import { Game } from "./classes/Game";

const app = express();
const server = app.listen(3001);
const io = socketIO(server);

// TODO: extract games object
const games = new Map();

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/roomId', (req, res) => res.send(generateId(16)));

app.get('/:roomId', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

io.on('connection', (socket) => {
    socket.on('join', ({ room, playerId }) => {
        if (!room) console.error('Room name is not exist');
        socket.join(room);
        if (!games.has(room)) games.set(room, new Game());
        const game = games.get(room);
        const player = game.ensurePlayer(playerId);
        socket.emit('game-connection', { player });
        io.to(room).emit('new-state', { game })
        socket.on('move', ({ id, state }) => {
            const player = game.getPlayer(id);
            player.setPosition(state);
            socket.broadcast.to(room).emit('new-state', { game })
        })
    })
});
