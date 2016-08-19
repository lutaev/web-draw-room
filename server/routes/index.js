
'use strict';

module.exports = function(router) {

  router.post('/', (req, res, next) => {
    res.json({status: 200});
  });

  return router;
};