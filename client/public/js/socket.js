

'use strict';

import io from 'socket.io-client';
import Dispatcher from './dispatcher';

export default (roomCode) => {
  var socket = io.connect('http://localhost:8000');

  socket.on('server-draw', data => {
    console.log(data);

    Dispatcher.dispatch({
      eventName: 'server-draw',
      data: { code: this.code }
    });
  });

  socket.on('partner-added', data => {
    Dispatcher.dispatch({
      eventName: 'partner-added'
    });
  });
};