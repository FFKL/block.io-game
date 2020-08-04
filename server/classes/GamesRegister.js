import { Game } from "./Game";
import { log } from '../helpers';
import { GAME_LIVE_THRESHOLD_MS } from "../constants";

export class GamesRegister {
    constructor() {
        this.games = new Map();
    }

    ensureRoom(id) {
        if (!this.games.has(id)) {
            log.info('New room created', `Id: ${id}`);
            this.games.set(id, new Game())
        }

        return this.games.get(id);
    }

    init() {
        setInterval(() => this.removeOldGames(), GAME_LIVE_THRESHOLD_MS)
    }

    removeOldGames() {
        const oldGameKeys = [];
        this.games.forEach((game, key) => this.isOldGame(game) && oldGameKeys.push(key));
        oldGameKeys.forEach(key => this.games.delete(key));
        // TODO: manage socket connections
        log.info('Inactive games removed', oldGameKeys);
    }

    isOldGame(game) {
        return Date.now() - game.lastActivity > GAME_LIVE_THRESHOLD_MS;
    }
}
