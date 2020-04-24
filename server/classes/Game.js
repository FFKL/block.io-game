import { createPlayer, createTreasure } from '../factories';

export class Game {
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

    updatePlayerPosition(playerId, position) {
        const player = this.getPlayer(playerId);

        if (!player) return;

        player.setPosition(position);

        if (player.isWinner(this.treasure)) {
            this.treasure = createTreasure();
            player.increaseScore();
        }
    }

    disconnectPlayer(id) {
        const player = this.getPlayer(id);
        if (player) player.disconnected();
    }

    ensurePlayer(playerId) {
        if (!playerId || !this.hasPlayer(playerId)) {
            const player = createPlayer();
            this.addPlayer(player);

            return player;
        }
        const player = this.getPlayer(playerId);
        player.connected();

        return player;
    }
}
