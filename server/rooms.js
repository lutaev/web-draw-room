
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

      let connection = socketConnect( data.code);

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
      partner: personsLength === 1
    }
  },

  getIO() {
    return io;
  },

  getRooms() {
    return rooms;
  }
};

//console.log( c );
function a(){
  console.log( c );

  var c = 1;
  (function(c){
    c = 2;
    console.log( c );
  })( c );

  console.log( c );
}

a();