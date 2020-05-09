import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { CreateGameModal } from './CreateGameModal';
import { init } from '../init';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            players: []
        }
    }

    displayModal = show => this.setState({ showModal: show });
    updateScore = players => this.setState({ players });

    componentDidMount() {
        init(this.displayModal, this.updateScore);
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
