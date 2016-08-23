

'use strict';

import io from 'socket.io-client';
import Dispatcher from './dispatcher';

export default (roomCode) => {
  var socket = io.connect('http://localhost:8000/' + roomCode);

  socket.on('server-draw', data => {
    Dispatcher.dispatch({
      eventName: 'server-draw',
      data: data
    });
  });

  socket.on('partner-added', data => {
    Dispatcher.dispatch({
      eventName: 'partner-added'
    });
  });

  socket.on('room-deleted', data => {
    Dispatcher.dispatch({
      eventName: 'room-deleted'
    });
  });

  return socket;
};