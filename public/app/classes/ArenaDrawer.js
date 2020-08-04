import { CANVAS_HEIGHT, CANVAS_WIDTH, SQUARE_SIDE } from '../../../shared/constants';
import { roundRect } from '../helpers';

export class ArenaDrawer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw({ treasure, player, rivals }) {
        this.clean();
        treasure && this.drawTreasure(treasure);
        for (const rival of rivals) {
            this.drawRect(rival)
        }
        player.position && this.drawRect(player)
    }

    clean() {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawTreasure(treasure) {
        this.drawRect({ color: 'yellow', position: { ...treasure } })
    }

    drawRect({ color, position: { x, y } }) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = 'black';
        roundRect(this.ctx, x, y, SQUARE_SIDE, SQUARE_SIDE)
    }
}
