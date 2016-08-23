
'use strict';
let rooms = require('rooms');

module.exports = server => {
  const io = require('socket.io')(server);
  io.set('origins', 'localhost:*');

  rooms.setWSInstance(io);
};