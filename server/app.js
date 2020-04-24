import express from "express";
import path from "path";
import generateId from "uid";
import socketIO from 'socket.io';

import { Game } from "./classes/Game";
import { GamesRegister } from "./classes/GamesRegister";

const app = express();
const server = app.listen(3001);
const io = socketIO(server);

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/roomId', (req, res) => res.send(generateId(16)));

app.get('/:roomId', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const gamesRegister = new GamesRegister();

io.on('connection', (socket) => {
    socket.on('join', ({ room, playerId }) => {
        if (!room) console.error('Room name is not exist');
        initGameRoom(socket, room, playerId);
    })
});

function initGameRoom(socket, roomId, playerId) {
    const game = gamesRegister.ensureRoom(roomId);
    const player = game.ensurePlayer(playerId);

    socket.join(roomId);
    socket.emit('game-connection', { player });
    io.to(roomId).emit('state', { game })

    socket.on('move', ({ id, state }) => {
        game.updatePlayerPosition(id, state);

        io.to(roomId).emit('state', { game })
    })

    socket.on('disconnect', () => {
        game.disconnectPlayer(playerId);
        io.to(roomId).emit('state', { game })
    })
}
