var express = require('express');
var router = new express.Router();
var Models = require('../models');

router.get('/', (req, res, next) => {
  return Models.Layer.query(qb => {
    qb.select();
  }).fetchAll({
    debug: true
  }).then(result => {
    console.log(result.toGeoJSON());
    res.locals.rows = result.toJSON();
    res.render('layers');
  });
});

router.post('/filter', (req, res, next) => {
  var opts = req.body.options;
  console.log(opts);
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
