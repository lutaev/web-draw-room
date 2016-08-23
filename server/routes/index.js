
'use strict';

let rooms = require('rooms');

module.exports = router => {

  router.post('/add-code', (req, res, next) => {
    if (!req.body.code || !req.body.color) {
      throw new Error('No code!');
    }

    var person = rooms.addPerson(req.body);

    if (person) {
      var data = {
        status: 200,
        person: person
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