import express from "express";
import path from "path";
import generateId from "uid";
import socketIO from 'socket.io';
import { log } from './helpers';
import 'colors';

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
gamesRegister.init();

io.on('connection', (socket) => {
    socket.on('join', ({ room, playerId }) => {
        if (!room) log.err('Room name is not exist')
        else initGameRoom(socket, room, playerId);
    })
});

function initGameRoom(socket, roomId, playerId) {
    const game = gamesRegister.ensureRoom(roomId);
    const player = game.ensurePlayer(playerId);

    socket.join(roomId);
    socket.emit('game-connection', { player });
    io.to(roomId).emit('state', { game })

    log.info('Connected', `SocketID: ${socket.id}, Player: ${JSON.stringify(player, null, 5)}`);

    socket.on('move', ({ id, state }) => {
        game.updatePlayerPosition(id, state);

        io.to(roomId).emit('state', { game })
    })

    socket.on('disconnect', (reason) => {
        game.disconnectPlayer(player.id);
        io.to(roomId).emit('state', { game })

        log.info(
            'Disconnected',
            `Reason: ${reason}, SocketID: ${socket.id}, Player: ${JSON.stringify(player, null, 5)}`
        );
    })
}
