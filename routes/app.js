var express = require('express');
var router = new express.Router();
var Models = require('../models');
var _ = require('lodash');

router.get('/', (req, res, next) => {
console.log('routes/app GET');  
res.render('app');
});

router.post('/filter', (req, res, next) => {
  var opts = req.body.options;
  console.log("routes/app/POST opts =  " +opts);
  Models.LayerFilterOption.query(qb => {
    qb.whereIn('id', opts);
  }).fetchAll({
    withRelated: [
      'layerFilter.stormwaters.layer',
      'layerFilter.cmoss.layer'
    ]})
    .then(rows => {
      router.locals.rows = rows;
      res.json(rows);
    });
});

module.exports = router;
