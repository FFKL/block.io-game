import io from 'socket.io-client';

import { Game } from './classes/Game';
import { Player } from './classes/Player';
import { GameTransporter } from '../../shared/GameTransporter';
import { parseRoomId } from './helpers';
import { ArenaDrawer } from './classes/ArenaDrawer';

export function init (showModal, updateScoreList) {
    const socket = io(origin, { transports: ['websocket', 'polling'] });

    const context = document.getElementById("arena").getContext("2d");
    const drawer = new ArenaDrawer(context);
    const game = new Game();


    const roomId = parseRoomId(document.location.pathname);
    const playerId = localStorage.getItem('playerId');

    if (roomId) {
        socket.emit('join', { playerId, room: roomId });
    } else {
        showModal(true);
    }

    socket.on('game-connection', ({ player }) => initGame(player, game));
    socket.on('state', (state) => {
        const gameState = GameTransporter.unpack(state.game)
        updateScoreList(gameState.players);
        game.updateState(gameState);
    })
    startGameLoop(() => drawer.draw(game));

    function initGame({ id, position: { x, y }, color }, game) {
        localStorage.setItem('playerId', id);
        const player = new Player(x, y, color, id);
        player.onMove((x, y) => socket.emit('move', { id, state: { x, y } }))
        game.setPlayer(player)
        document.addEventListener('keydown', e => player.updatePosition(e.key));
    }

    function startGameLoop(callback) {
        setInterval(() => {
            callback();
        }, 1000 / 60)
        // let stopped = false;
        // window.requestAnimationFrame(() => {
        //     if (!stopped) {
        //         callback();
        //         window.requestAnimationFrame(callback);
        //     }
        // })
        //
        // return {
        //     stop() {
        //         stopped = true;
        //     }
        // }
    }

}
