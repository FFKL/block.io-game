import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import io from 'socket.io-client';

import '../styles/index.css'

import { Game } from './game';
import { Player } from "./Player";
import { FPS } from "./constants";

$(document).ready(() => {
    $('#generate-link').modal()
    $('#generate-link-btn').on('click', () => {
        const origin = document.location.origin;

        fetch(`${origin}/roomId`)
            .then(res => res.text())
            .then(id => `${origin}/${id}`)
            .then(link => $('#generate-input').val(link));
    })
})

const players = {};
let you = null;
const socket = io(origin, { transports: ['websocket', 'polling']});

socket.on('move', ({ id, state: { x, y } }) => {
    if (!players[id]) {
        players[id] = new Player(x, y, context)
    }
    players[id].setState({ x, y })
})

socket.on('game-connection', ({ player: { state: { x, y }, color} }) => {
    you = new Player(x, y, color, context);
    // you.onMove((x, y) => socket.emit('move', { state: { x, y }, room: 'example-room' }))
    document.addEventListener('keydown', e => you.updatePosition(e.key));
});
socket.emit('join', { room: 'example-room' })

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const game = new Game(context);

const intervalId = setInterval(() => {
    game.clean();
    if (you) you.draw();
    for(const play of Object.values(players)) {
        play.draw();
    }
}, 1000 / FPS);
