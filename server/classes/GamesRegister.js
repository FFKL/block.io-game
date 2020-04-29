import { Game } from "./Game";
import { GAME_LIVE_THRESHOLD_MS } from "../constants";

export class GamesRegister {
    constructor() {
        this.games = new Map();
    }

    ensureRoom(id) {
        if (!this.games.has(id)) {
            this.games.set(id, new Game())
        }

        return this.games.get(id);
    }

    init() {
        setTimeout(() => this.removeOldGames(), GAME_LIVE_THRESHOLD_MS)
    }

    removeOldGames() {
        const oldGameKeys = [];
        this.games.forEach((game, key) => this.isOldGame() && oldGameKeys.push(key))
        oldGameKeys.forEach(key => this.games.remove(key));
    }

    isOldGame(game) {
        return Date.now() - game.lastActivity > GAME_LIVE_THRESHOLD_MS;
    }
}
