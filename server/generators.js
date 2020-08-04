import { CANVAS_HEIGHT, CANVAS_WIDTH, SQUARE_SIDE } from "../shared/constants";

function generateRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateX() {
    return generateRandomInt(0, CANVAS_WIDTH - SQUARE_SIDE);
}

export function generateY() {
    return generateRandomInt(0, CANVAS_HEIGHT - SQUARE_SIDE);
}
