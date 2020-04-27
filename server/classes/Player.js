import { SQUARE_SIDE } from "../constants";

export class Player {
    constructor(id, name, color, { x, y }, score = 0) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.state = { x, y };
        this.score = score;
        this.isConnected = true;
    }

    disconnected() {
        this.isConnected = false;
    }

    connected() {
        this.isConnected = true;
    }

    setPosition({ x, y }) {
        this.state = { ...this.state, x, y }
    }

    increaseScore() {
        this.score += 1;
    }

    isWinner({ x, y }) {
        return this.isCollision(
            {
                x1: this.state.x,
                y1: this.state.y,
                x2: this.state.x + SQUARE_SIDE,
                y2: this.state.y + SQUARE_SIDE
            },
            {
                x1: x,
                y1: y,
                x2: x + SQUARE_SIDE,
                y2: y + SQUARE_SIDE
            }
        )
    }

    isCollision(rect1, rect2) {
        return rect1.x1 < rect2.x2 &&
            rect1.x2 > rect2.x1 &&
            rect1.y1 < rect2.y2 &&
            rect1.y2 > rect2.y1
    }
}
