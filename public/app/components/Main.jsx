import React from 'react';
import { ScoreList } from './ScoreList';
import { Arena } from './Arena';

export class Main extends React.Component {
    render() {
        return (
            <main className="container">
                <div className="row mt-5 align-items-center game-container">
                    <div className="col-9">
                        <Arena/>
                    </div>
                    <div className="col-3 score">
                        <ScoreList players={
                            [...this.props.players ?? []]
                            .sort((a, b) => b.score - a.score)
                        }/>
                    </div>
                </div>
            </main>
        )
    }
}
