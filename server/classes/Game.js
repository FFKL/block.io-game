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

    reloadTreasure() {
        this.treasure = createTreasure();
    }

    ensurePlayer(playerId) {
        if (!playerId || !this.hasPlayer(playerId)) {
            const player = createPlayer();
            this.addPlayer(player);

            return player;
        }

        return this.getPlayer(playerId);
    }
}
