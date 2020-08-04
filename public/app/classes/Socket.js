import io from 'socket.io-client';
import { GameTransporter } from '../../../shared/GameTransporter';

export class Socket {
    constructor() {
        this.socket = io(origin, { transports: ['websocket', 'polling'] });
    }

    join(playerId, roomId) {
        this.socket.emit('join', { playerId, room: roomId });
    }

    move(playerId, position) {
        this.socket.emit('move', { id: playerId, state: position })
    }

    onGameConnection(callback) {
        this.socket.on('game-connection', callback);

        return this;
    }

    onGameStateChanges(callback) {
        this.socket.on('state', state => callback({ ...state, game: GameTransporter.unpack(state.game) }));

        return this;
    }
}
