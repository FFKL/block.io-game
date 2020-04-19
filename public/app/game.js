import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

export class Game {
    constructor(ctx) {
        this.ctx = ctx;
    }

    clean() {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
