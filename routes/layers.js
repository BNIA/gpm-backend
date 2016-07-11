var express = require('express');
var router = new express.Router();
var Models = require('../models');

router.get('/', (req, res, nex) => {
  return Models.Layer.query(qb => {
    qb.select();
  }).fetchAll({
    debug: true
  }).then(result => {
    res.json(result);
  });
});

module.exports = router;
