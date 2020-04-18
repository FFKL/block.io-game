import $ from 'jquery';
import io from 'socket.io-client';
import uid from 'uid';
import { Game } from './game';

import '../styles/index.css'
import { Player } from "./Player";
import { FPS } from "./constants";

const players = {};
const socket = io('http://localhost:3001', { transports: ['websocket', 'polling']});
socket.on('message', (data) => {
    $('h1').text(data);
})
socket.on('move', ({ id, state: { x, y } }) => {
    if (!players[id]) {
        players[id] = new Player(x, y, context)
    }

    players[id].setState({ x, y })
})
socket.emit('join', 'example-room')

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const player = new Player(10, 20, context);
const game = new Game(context);

player.onMove((x, y) => socket.emit('move', { state: { x, y }, room: 'example-room' }))

document.addEventListener('keydown', e => player.updatePosition(e.key));

const intervalId = setInterval(() => {
    game.clean();
    player.draw();
    for(const play of Object.values(players)) {
        play.draw();
    }
}, 1000 / FPS);

$('h1').addClass('red');

$('#generate-button').on('click', () => $('#generate-input').val(uid(10)))
