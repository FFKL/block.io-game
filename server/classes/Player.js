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

    isSquaresIntersection(a, b) {
        return this.isDotInside({ x: a.x1, y: a.y1 }, b) || this.isDotInside({ x: b.x1, y: b.y1 }, a);
    }

    isDotInside(dot, square) {
        return dot.x > square.x1 && dot.x < square.x2 && dot.y > square.y1 && dot.y < square.y2
    }
}
