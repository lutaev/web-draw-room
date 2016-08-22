
'use strict';

let rooms = {};
let index = 1;

module.exports = {
  addCode: code => {
    if (!rooms[code]) {
      rooms[code] = [];
    }

    if (rooms[code].length === 2) {
      return null;
    }

    const id = index;
    ++index;
    rooms[code].push(id);

    return {
      room: rooms[code],
      code: code,
      id: id
    }
  }
};
