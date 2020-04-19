import express from 'express';
import randomColor from 'randomcolor';
import socketIO from 'socket.io';
import generateId from 'uid';
import { random as generateName } from 'cat-names';
import path from 'path';

const app = express();
const server = app.listen(3001);
const io = socketIO(server);

const CANVAS_WIDTH = 720, CANVAS_HEIGHT = 480;
const SQUARE_SIDE = 30;
const games = new Map();

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/roomId', (req, res) => res.send(generateId(16)));

io.on('connection', (socket) => {
    socket.on('join', ({ room, playerId }) => {
        if (!room) console.error('Room name is not exist');
        socket.join(room);
        if (!games.has(room)) games.set(room, new Game());
        const game = games.get(room);
        const player = findOrCreatePlayer(playerId, game);
        socket.emit('game-connection', { player });
        io.to(room).emit('new-state', { game })
        socket.on('move', ({ id, state }) => {
            const player = game.getPlayer(id);
            player.setPosition(state);
            socket.broadcast.to(room).emit('new-state', { game })
        })
    })
});

function findOrCreatePlayer(playerId, game) {
    if (!playerId || !game.hasPlayer(playerId)) {
        const player = createPlayer();
        game.addPlayer(player);

        return player;
    }

    return game.getPlayer(playerId);
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateX() {
    return getRandomInt(0, CANVAS_WIDTH - SQUARE_SIDE);
}

function generateY() {
    return getRandomInt(0, CANVAS_HEIGHT - SQUARE_SIDE);
}

function createPlayer() {
    const playerId = generateId(10);
    const color = randomColor({ luminocity: 'dark', format: 'rgb' });
    const position = { x: generateX(), y: generateY() };
    const name = generateName();

    return new Player(playerId, name, color, position)
}

function createTreasure() {
    return new Treasure(generateX(), generateY());
}

function isSquaresIntersection(a, b) {
    return (a.y1 < b.y2 || a.y2 > b.y1 || a.x2 < b.x1 || a.x1 > b.x2);
}

class Treasure {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Game {
    constructor() {
        this.players = [];
        this.treasure = createTreasure();
    }

    addPlayer(player) {
        this.players.push(player);
    }

    getPlayer(playerId) {
        return this.players.find(({ id }) => id === playerId);
    }

    hasPlayer(playerId) {
        return this.players.some(({ id }) => id === playerId);
    }
}

class Player {
    constructor(id, name, color, { x, y }, score = 0) {
        this.id = id;
        this.color = color;
        this.state = { x, y };
        this.score = score;
    }

    setPosition({ x, y }) {
        this.state = { ...this.state, x, y }
    }

    isWinner({ x, y }) {
        return isSquaresIntersection(
            {
                x1: this.state.x,
                y1: this.state,
                x2: this.state.x + SQUARE_SIDE,
                y2: this.state.y + SQUARE_SIDE
            },
            {
                x1: x,
                y1: y,
                x2: x + SQUARE_SIDE,
                y2: y + SQUARE_SIDE
            }
        )
    }
}
