
'use strict';

let rooms = require('rooms');
let namespaces = {};

module.exports = function(code) {
    var io = rooms.getIO();

    if (!namespaces[code]) {
        namespaces[code] = io.of('/' + code);

        namespaces[code].on('connection', (socket) => {
            var persons = rooms.getRooms()[code].persons;

            if (persons.length === 2) {
                socket.broadcast.emit('PARTNER_ADDED');
            }

            socket.on('draw-start', data => {
                socket.broadcast.emit('DRAW_START', data);
            });

            socket.on('draw', data => {
                socket.broadcast.emit('DRAW', data);
            });

            socket.on('draw-stop', () => {
                socket.broadcast.emit('DRAW_STOP');
            });

            socket.on('clear-board', () => {
                namespaces[code].emit('CLEAR_BOARD');
            });

            socket.on('disconnect', () => {
                socket.broadcast.emit('PARTNER_LOST');
                delete rooms.getRooms()[code];
            })
        });
    }

    return namespaces[code];
};