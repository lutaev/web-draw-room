
'use strict';

import dispatcher from 'flux';
import store from './store';

const Dispatcher = new dispatcher.Dispatcher();

Dispatcher.register( function( event ) {

  switch( event.eventName ) {

    case 'add-code':
      store.checkCode(event.data);
      break;

    case 'partner-added':
      store.partnerAdded(event.data);
      break;

    case 'room-deleted':
      store.refreshAll();
      break;

    case 'draw-start':
      store.drawStart(event.data);
      break;

    case 'draw':
      store.draw(event.data);
      break;

    case 'draw-stop':
      store.drawStop(event.data);
      break;

    case 'clear-board':
      store.clearBoard();
      break;

    case 'server-draw-start':
      store.serverDrawStart(event.data);
      break;

    case 'server-draw':
      store.serverDraw(event.data);
      break;

    case 'server-draw-stop':
      store.serverDrawStop(event.data);
      break;

    case 'server-clear-board':
      store.serverClearBoard();
      break;
  }

  return true;
});


export default Dispatcher;