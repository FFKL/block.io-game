import $ from 'jquery';
import io from 'socket.io-client';
import uid from 'uid';

import '../styles/index.css'

const socket = io('http://localhost:3001', { transports: ['websocket', 'polling']});
socket.on('message', (data) => {
    $('h1').text(data);
})
socket.emit('join', 'example-room')

$('h1').addClass('red');

$('#generate-button').on('click', () => $('#generate-input').val(uid(10)))
