
'use strict';


module.exports = server => {
  const io = require('socket.io')(server);
  io.set('origins', 'localhost:*');


  io.on('connection', socket => {
    socket.emit('server-draw', {hello: 'world'});
    socket.on('client-draw', data => {
      console.log(data);
    })
  })
};