var express = require('express');
var router = new express.Router();
var Models = require('../models');
var _ = require('lodash');

router.get('/indicators', (req, res, next) => {
  return Models.VitalSignsIndicators.query(qb => qb.select())
  .fetch({
    withRelated: [
      'vitalSignsSection',
      'vitalSignsDataBreaks.vitalSignsColor'
    ]
  })
  .then(rows => rows.toJSON({pretty: true}))
  .then(rows => {
    res.json(rows);
    next();
  });
});

router.post('/boundary', (req, res, next) => {
  var id = JSON.parse(req.body.id);
  return Models.VitalSignsDataPoints.query(qb => qb.select().where({
    vital_signs_indicator_id: id
  })).fetch({
    withRelated: [
      'communityStatisticalArea.boundary',
      'vitalSignsDataBreak.vitalSignsColor'
    ]
  }).then(data => {
    var geo = data.toGeoJSON();
    res.json(geo);
    next();
  });
});

module.exports = router;
