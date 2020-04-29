import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import io from 'socket.io-client';

import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const playerId = localStorage.getItem('playerId');

    if (roomId) {
        socket.emit('join', { playerId, room: roomId });
    } else {
        $('#generate-link').modal();
    }

    let prevState = null;

    socket.on('game-connection', ({ player }) => initGame(player, game, context));
    socket.on('state', (state) => {
        updateState(game, prevState, state);
        prevState = state;
    })
    startGameLoop(() => game.draw());
})

function updateState(game, prevState, currState) {
    if (!prevState || !isSameScore(prevState, currState)) {
        updateScoreView(currState.game.players);
    }
    game.updateState(currState.game)
}

function updateScoreView(players) {
    const htmlList = [...players]
        .sort((a, b) => b.score - a.score)
        .map(p => `<li style="color: ${p.color}">${p.name} - ${p.score}</li>`)
        .join('');
    $('#score').html(htmlList);
}

function isSameScore(prev, curr) {
    const prevScore = prev.game.players.reduce((acc, val) => acc + val.score, 0);
    const currScore = curr.game.players.reduce((acc, val) => acc + val.score, 0);

    return prevScore === currScore;
}

function initGame({ id, state: { x, y }, color }, game, ctx) {
    localStorage.setItem('playerId', id);
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
