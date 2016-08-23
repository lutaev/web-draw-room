
'use strict';

let rooms = require('rooms');
let connections = {};

module.exports = function(code) {
    var io = rooms.getIO();

    if (!connections[code]) {
        connections[code] = io.of('/' + code);

        connections[code].on('connection', (socket) => {
            var persons = rooms.getRooms()[code].persons;

            if (persons.length === 2) {
                socket.broadcast.emit('partner-added');
            }

            socket.on('draw-start', data => {
                socket.broadcast.emit('draw-start', data);
            });

            socket.on('draw', data => {
                socket.broadcast.emit('draw', data);
            });

            socket.on('draw-stop', () => {
                socket.broadcast.emit('draw-stop');
            });

            socket.on('clear-board', () => {
                connections[code].emit('clear-board');
            });

            socket.on('disconnect', () => {
                socket.broadcast.emit('room-deleted');
                delete rooms.getRooms()[code];
            })
        });
    }

    return connections[code];
};