var express = require('express');
var router = new express.Router();
var Models = require('../models');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  return Models.Boundaries.query(qb => qb.select())
  .fetch({})
  .then(rows => rows.toJSON({pretty: true}))
  .then(rows => {
    res.json(rows);
    next();
  });
});

router.post('/boundaries', (req, res, next) => {
  var ids = JSON.parse(req.body.ids);
  Models.Boundaries.query(qb => qb.whereIn('id', ids))
  .fetch({withRelated: [
    'boundaryDetail'
  ]}).then(collection => {
    var geo = collection.toGeoJSON({pretty: true});
    res.json(geo);
    next();
  });
});

module.exports = router;
