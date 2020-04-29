import { createPlayer, createTreasure } from '../factories';

export class Game {
    constructor() {
        this.players = [];
        this.treasure = createTreasure();
        this.continueLive();
    }

    continueLive() {
        this.lastActivity = Date.now();
    }

    addPlayer(player) {
        this.players.push(player);
        this.continueLive();
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
        this.continueLive()
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
        this.continueLive();

        return player;
    }
}
