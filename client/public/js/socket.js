

'use strict';

import io from 'socket.io-client';
import Dispatcher from './dispatcher';

let socket = null;

export default {
  connect(roomCode) {
    socket = io.connect('http://localhost:8000/' + roomCode);

    socket.on('draw-start', data => {
      Dispatcher.dispatch({
        eventName: 'server-draw-start',
        data: data
      });
    });

    socket.on('draw', data => {
      Dispatcher.dispatch({
        eventName: 'server-draw',
        data: data
      });
    });

    socket.on('draw-start', data => {
      Dispatcher.dispatch({
        eventName: 'server-draw-stop'
      });
    });

    socket.on('partner-added', data => {
      debugger;
      Dispatcher.dispatch({
        eventName: 'partner-added'
      });
    });

    socket.on('room-deleted', data => {
      Dispatcher.dispatch({
        eventName: 'room-deleted'
      });
    });

    socket.on('clear-board', data => {
      Dispatcher.dispatch({
        eventName: 'server-clear-board'
      });
    });

    return socket;
  },

  disconnect() {
    socket = null;
  }
}