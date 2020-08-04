import { Player } from './classes/Player';
import { parseRoomId } from './helpers';
import { ArenaDrawer } from './classes/ArenaDrawer';
import { Socket } from './classes/Socket';

export function init(state) {
    const context = document.getElementById("arena").getContext("2d");
    const socket = new Socket();
    const drawer = new ArenaDrawer(context);

    const roomId = parseRoomId(document.location.pathname);
    const playerId = localStorage.getItem('playerId');

    if (roomId) {
        socket.join(playerId, roomId);
    } else {
        openInvitationalModal();
    }

    socket
        .onGameConnection(({ player }) => initGame(player))
        .onGameStateChanges(state => updateState(state));

    function initGame({ id, position: { x, y }, color }) {
        localStorage.setItem('playerId', id);
        const player = new Player(x, y, color, id);
        player.onMove((x, y) => socket.move(id, { x, y }))
        state.setPlayer(player);
        startGameLoop(() => drawer.draw(state.getGame()));
    }

    function openInvitationalModal() {
        state.setModal(true);
    }

    function updateState(inputState) {
        state.updateGame(inputState);
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
