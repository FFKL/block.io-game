import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { CreateGameModal } from './CreateGameModal';
import { init } from '../init';
import { Game } from '../classes/Game';
import { State } from '../State';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            players: []
        }
    }

    displayModal = showModal => this.setState({ showModal });
    updateScore = players => this.setState({ players });

    componentDidMount() {
        const state = new State(new Game());
        state.onChange(({ modal, game: { players } }) => {
            if (this.state.showModal !== modal) {
                this.displayModal(modal);
            }

            if (this.state.players !== players) {
                this.updateScore(players);
            }
        })
        init(state);
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Main players={this.state.players}/>
                <CreateGameModal show={this.state.showModal}/>
            </React.Fragment>
        );
    }
}
