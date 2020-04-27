import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import io from 'socket.io-client';

import '../styles/index.css'

import { Game } from './classes/Game';
import { Player } from "./classes/Player";
import { FPS } from "./constants";

const socket = io(origin, { transports: ['websocket', 'polling'] });

$(document).ready(() => {
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");

    const game = new Game(context);

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

    socket.on('game-connection', ({ player }) => initGame(player, game, context));
    socket.on('state', (state) => game.updateState(state.game))
    startGameLoop(() => game.draw());
})

function initGame({ id, state: { x, y }, color }, game, ctx) {
    sessionStorage.setItem('playerId', id);
    const player = new Player(x, y, color, id, ctx);
    player.onMove((x, y) => socket.emit('move', { id, state: { x, y } }))
    game.setPlayer(player)
    document.addEventListener('keydown', e => player.updatePosition(e.key));
}

function parseRoomId(pathname) {
    const [, id] = pathname.split('/');

    return id;
}

function startGameLoop(callback) {
    const intervalId = setInterval(() => {
        requestAnimationFrame(callback);
    }, 1000 / FPS);

    return {
        stop() {
            clearInterval(intervalId);
        }
    }
}
