
'use strict';

let io = null;
let rooms = {};
let index = 1;

module.exports = {
  setWSInstance(inst) {
    io = inst;
  },

  addPerson(data) {
    if (!io) {
      throw new Error('No websocket connect instance!');
    }

    const socketConnect = require('socket/socket-connect');

    // I there is no room for this code - let's add room, array for persons and ws connection
    if (!rooms[data.code]) {

      var connection = socketConnect( data.code);

      rooms[data.code] = {
        persons: [],
        connection: connection
      };
    }

    var personsLength = rooms[data.code].persons.length;
    // Rooms for two persons only
    if (personsLength === 2) {
      return null;
    }

    const id = index;
    ++index;
    rooms[data.code].persons.push({
      id: id
    });

    return {
      code: data.code,
      color: data.color,
      id: id,
      hasPartner: personsLength === 1
    }
  },

  getIO() {
    return io;
  },

  getRooms() {
    return rooms;
  }
};

//function setConnection(code) {
//  var connection = io.of('/' + code);
//
//  connection.on('connection', (socket) => {
//    socket.broadcast.emit('partner-added');
//
//    socket.on('draw-start', data => {
//      socket.broadcast.emit('server-draw-start', data);
//    });
//
//    socket.on('draw', data => {
//      socket.broadcast.emit('server-draw', data);
//    });
//
//    socket.on('draw-stop', () => {
//      socket.broadcast.emit('server-draw-stop');
//    });
//
//    socket.on('disconnect', () => {
//      socket.broadcast.emit('room-deleted');
//      deleteRoom(code);
//    })
//  });
//
//  return connection;
//}

//function deleteRoom(code) {
//  delete rooms[code];
//}
