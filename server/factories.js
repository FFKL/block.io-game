import generateId from "uid";
import randomColor from "randomcolor";
import { random as generateName } from "cat-names";

import { Player } from './classes/Player';
import { Treasure } from "./classes/Treasure";
import { generateX, generateY } from "./generators";

export function createPlayer() {
    const playerId = generateId(10);
    const color = randomColor({ luminocity: 'dark', format: 'rgb' });
    const position = { x: generateX(), y: generateY() };
    const name = generateName();

    return new Player(playerId, name, color, position)
}

export function createTreasure() {
    return new Treasure(generateX(), generateY());
}
