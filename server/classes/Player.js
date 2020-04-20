import { SQUARE_SIDE } from "../constants";

export class Player {
    constructor(id, name, color, { x, y }, score = 0) {
        this.id = id;
        this.color = color;
        this.state = { x, y };
        this.score = score;
    }

    setPosition({ x, y }) {
        this.state = { ...this.state, x, y }
    }

    isWinner({ x, y }) {
        return this.isSquaresIntersection(
            {
                x1: this.state.x,
                y1: this.state,
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

    isSquaresIntersection(a, b) {
        return (a.y1 < b.y2 || a.y2 > b.y1 || a.x2 < b.x1 || a.x1 > b.x2);
    }
}
