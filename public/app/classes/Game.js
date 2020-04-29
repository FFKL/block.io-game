import { CANVAS_HEIGHT, CANVAS_WIDTH, SQUARE_SIDE } from "../constants";
import { roundRect } from "../helpers";

export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.rivals = [];
        this.player = {};
        this.treasure = {};
    }

    setPlayer(player) {
        this.player = player;
    }

    updateState(game) {
        this.rivals = game.players.filter(p => p.id !== this.player.id && p.isConnected);
        this.treasure = game.treasure;
    }

    draw() {
        this.clean();
        this.drawTreasure();
        this.drawPlayer();
        this.drawRivals();
    }

    clean() {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawRivals() {
        this.rivals.forEach(rival => this.drawRect(rival));
    }

    drawTreasure() {
        this.drawRect({ color: 'yellow', state: { ...this.treasure }})
    }

    drawPlayer() {
        this.player.draw && this.player.draw();
    }

    drawRect({ color, state: { x, y } }) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = 'black';
        roundRect(this.ctx, x, y, SQUARE_SIDE, SQUARE_SIDE)
    }
}
