

'use strict';

import io from 'socket.io-client';
import store from './store';
import {serverDrawStart, serverDraw, serverDrawStop, serverClearBoard} from './core';

let sockets = {};

export default {
  connect(code) {
    if (!sockets[code]) {
      sockets[code] = io.connect('http://localhost:8000/' + code);

      sockets[code].on('PARTNER_ADDED', () => {
        store.dispatch({
          type: 'PARTNER_ADDED'
        });
      });

      sockets[code].on('PARTNER_LOST', () => {
        store.dispatch({
          type: 'PARTNER_LOST'
        });
      });

      sockets[code].on('DRAW_START', data => {
        serverDrawStart(data);
      });

      sockets[code].on('DRAW', data => {
        serverDraw(data);
      });

      sockets[code].on('DRAW_STOP', () => {
        serverDrawStop();
      });

      sockets[code].on('CLEAR_BOARD', () => {
        serverClearBoard();
      });
    }

    return sockets[code];
  }
}