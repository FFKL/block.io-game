import { Game } from "./Game";

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
}
