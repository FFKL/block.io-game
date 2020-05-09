import React from 'react';

import { setAlphaChannel } from '../helpers';

export class ScoreList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h2 className="score__title">Score 🏆</h2>
                <ul className="score__list">
                    {this.props.players.map(p => <li id={p.id} style={{ color: setAlphaChannel(p.color) }}>{p.name} - {p.score}</li>)}
                </ul>
            </React.Fragment>
        )
    }
}
