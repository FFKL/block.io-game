import EventEmitter from 'events';

export class State {
    eventEmitter = new EventEmitter();
    state = {
        modal: false,
        game: {}
    };

    constructor(game) {
        this.state.game = game;
    }

    onChange(callback) {
        this.eventEmitter.on('change', callback);
    }

    emitChangeEvent() {
        this.eventEmitter.emit('change', this.state);
    }

    updateGame(state) {
        this.state.game.updateState?.(state);
        this.emitChangeEvent();
    }

    getGame() {
        return this.state.game;
    }

    setPlayer(player) {
        this.state.game.setPlayer(player);
        this.emitChangeEvent();
        document.addEventListener('keydown', e => player.updatePosition(e.key));
    }

    setModal(val) {
        this.state.modal = val;
        this.emitChangeEvent();
    }
}
