

'use strict';

import io from 'socket.io-client';
import Dispatcher from './dispatcher';

let sockets = {};

export default {
  connect(code) {
    if (!sockets[code]) {
      sockets[code] = io.connect('http://localhost:8000/' + code);

      sockets[code].on('draw-start', data => {
        Dispatcher.dispatch({
          eventName: 'server-draw-start',
          data: data
        });
      });

      sockets[code].on('draw', data => {
        Dispatcher.dispatch({
          eventName: 'server-draw',
          data: data
        });
      });

      sockets[code].on('draw-start', data => {
        Dispatcher.dispatch({
          eventName: 'server-draw-stop'
        });
      });

      sockets[code].on('partner-added', data => {
        Dispatcher.dispatch({
          eventName: 'partner-added'
        });
      });

      sockets[code].on('room-deleted', data => {
        Dispatcher.dispatch({
          eventName: 'room-deleted'
        });
      });

      sockets[code].on('clear-board', data => {
        Dispatcher.dispatch({
          eventName: 'server-clear-board'
        });
      });
    }

    return sockets[code];
  }
}