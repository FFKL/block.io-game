import { CANVAS_HEIGHT, CANVAS_WIDTH, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "./constants";

export class Player {
    constructor(x, y, ctx) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speedCount = 5;
        this.onMoveHandler = () => null;
    }

    onMove(handler) {
        this.onMoveHandler = handler;
    }

    setState({x, y}) {
        this.x = x;
        this.y = y;
    }

    updatePosition(key) {
        const { x, y } = this;
        const newState = { x, y };
        switch (key) {
            case KEY_LEFT: {
                (newState.x < 0) ? newState.x = CANVAS_WIDTH - this.width : newState.x -= this.speedCount;
                break;
            }
            case KEY_RIGHT: {
                (newState.x + this.width > CANVAS_WIDTH) ? newState.x = 0 : newState.x += this.speedCount
                break;
            }
            case KEY_DOWN: {
                (newState.y < 0) ? newState.y = CANVAS_HEIGHT - this.height : newState.y -= this.speedCount
                break;
            }
            case KEY_UP: {
                (newState.y > CANVAS_HEIGHT) ? newState.y = 0 : newState.y += this.speedCount;
                break;
            }
        }
        const isStateChanged = this.x !== newState.x || this.y !== newState.y;

        if (isStateChanged) {
            this.x = newState.x;
            this.y = newState.y;
            this.onMoveHandler(this.x, this.y);
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
