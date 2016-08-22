
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

    case 'server-draw':
      store.serverDraw(event.data);
      break;
  }

  return true;
});


export default Dispatcher;