export class Game {
    constructor() {
        this.player = {};
        this.rivals = [];
        this.treasure = {};
    }

    setPlayer(player) {
        this.player = player;
    }

    updateState(game) {
        this.rivals = game.players.filter(p => p.id !== this.player.id && p.isConnected);
        this.treasure = game.treasure;
    }
}
