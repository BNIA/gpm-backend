var express = require('express');
var router = new express.Router();
var Models = require('../models');
var LIMIT = 25;

router.get('/', (req, res, nex) => {
  return Models.Csa.query(qb => {
    qb.select()
      .limit(LIMIT);
  }).fetchAll({
    debug: true
  }).then(result => {
    res.json(result);
  });
});

module.exports = router;
