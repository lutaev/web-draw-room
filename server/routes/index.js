
'use strict';

let rooms = require('rooms');

module.exports = router => {

  router.post('/add-code', (req, res, next) => {
    var code = req.body.code;
    if (!code) {
      throw new Error('No code!');
    }

    var room = rooms.addCode(code);

    if (room) {
      var data = {
        status: 200,
        id: room.id,
        code: room.code
      };
    } else {
      data = {
        status: 400,
        message: 'There are more than one person in this room. Try other code.'
      };
    }

    res.json(data);
  });

  return router;
};