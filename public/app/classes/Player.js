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
        const newState = this.adjustPositionAccordingToCanvasBoundaries(this.calculateNewState(key));
        const isStateChanged = this.position.x !== newState.x || this.position.y !== newState.y;

        if (isStateChanged) {
            this.position.x = newState.x;
            this.position.y = newState.y;
            this.onMoveHandler(this.position.x, this.position.y);
        }
    }

    calculateNewState(key) {
        const newState = { ...this.position };
        switch (key) {
            case KEY_LEFT: {
                newState.x -= this.speedCount;
                break;
            }
            case KEY_RIGHT: {
                newState.x += this.speedCount;
                break;
            }
            case KEY_DOWN: {
                newState.y -= this.speedCount;
                break;
            }
            case KEY_UP: {
                newState.y += this.speedCount;
                break;
            }
        }

        return newState;
    }

    adjustPositionAccordingToCanvasBoundaries(position) {
        const adjustedPosition = { ...position };
        if (position.x < 0) {
            adjustedPosition.x = CANVAS_WIDTH - this.width
        }
        if (position.x + this.width > CANVAS_WIDTH) {
            adjustedPosition.x = 0;
        }
        if (position.y < 0) {
            adjustedPosition.y = CANVAS_HEIGHT - this.height
        }
        if (position.y + this.height > CANVAS_HEIGHT) {
            adjustedPosition.y = 0
        }

        return adjustedPosition;
    }
}
