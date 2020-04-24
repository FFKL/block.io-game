import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import io from 'socket.io-client';

import '../styles/index.css'

import { Game } from './game';
import { Player } from "./Player";
import { FPS } from "./constants";

const socket = io(origin, { transports: ['websocket', 'polling'] });


$(document).ready(() => {
    $('#generate-link-btn').on('click', () => {
        const origin = document.location.origin;

        fetch(`${origin}/roomId`)
            .then(res => res.text())
            .then(id => `${origin}/${id}`)
            .then(link => $('#generate-input').val(link));
    })

    const roomId = parseRoomId(document.location.pathname);
    const playerId = sessionStorage.getItem('playerId');

    if (roomId) {
        socket.emit('join', { playerId, room: roomId })
    } else {
        $('#generate-link').modal()
    }

    socket.on('game-connection', ({ player: { id, state: { x, y }, color } }) => {
        sessionStorage.setItem('playerId', id);
        you = new Player(x, y, color, id, context);
        you.onMove((x, y) => socket.emit('move', { id, state: { x, y } }))
        document.addEventListener('keydown', e => you.updatePosition(e.key));
    });
})

function parseRoomId(pathname) {
    const [, id] = pathname.split('/');

    return id;
}

let rivals = [];
let you = {};
let treasure = {};

socket.on('state', ({ game }) => {
    rivals = game.players.filter(p => p.id !== you.id && p.isConnected);
    treasure = game.treasure;
})

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const game = new Game(context);

const intervalId = setInterval(() => {
    requestAnimationFrame(() => {
        game.clean();
        draw({ color: 'yellow', state: { ...treasure }})
        if (you.draw) you.draw();
        rivals.forEach(rival => draw(rival));
    })
}, 1000 / FPS);

function draw({ color, state: { x, y } }) {
    context.fillStyle = color;
    context.fillRect(x, y, 30, 30);
}
