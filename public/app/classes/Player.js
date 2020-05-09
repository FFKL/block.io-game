import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../constants";
import { CANVAS_HEIGHT, CANVAS_WIDTH, SQUARE_SIDE } from "../../../shared/constants";
import { roundRect } from '../helpers';

export class Player {
    constructor(x, y, color, id) {
        this.color = color;
        this.id = id;
        this.position = { x, y };
        this.width = SQUARE_SIDE;
        this.height = SQUARE_SIDE;
        this.speedCount = 5;
        this.onMoveHandler = () => null;
    }

    onMove(handler) {
        this.onMoveHandler = handler;
    }

    updatePosition(key) {
        const { x, y } = this.position;
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
        const isStateChanged = this.position.x !== newState.x || this.position.y !== newState.y;

        if (isStateChanged) {
            this.position.x = newState.x;
            this.position.y = newState.y;
            this.onMoveHandler(this.position.x, this.position.y);
        }
    }
}
