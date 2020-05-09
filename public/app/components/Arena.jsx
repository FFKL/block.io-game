import React from 'react';

export class Arena extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <canvas id="arena" width="720" height="480"></canvas>
        )
    }
}
