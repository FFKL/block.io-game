import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { getRoomId } from '../api';

export class CreateGameModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameLink: ''
        }
    }

    generateGameLink = () => getRoomId()
        .then(gameLink => this.setState({ gameLink }))
        .catch(e => console.error(e));

    startGame = () => window.location = this.state.gameLink;

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>C'mon, Grab Your Friends...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Copy generated link and send to your friends!</span>
                    <InputGroup size="sm" className="mb-3">
                        <FormControl defaultValue={this.state.gameLink}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.generateGameLink}>
                        Generate
                    </Button>
                    <Button variant="primary" onClick={this.startGame}>
                        Play!
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
