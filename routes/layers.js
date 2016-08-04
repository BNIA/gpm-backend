var express = require('express');
var router = new express.Router();
var Models = require('../models');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  return new Models.StormwaterRemediationSites()
    .fetch({
      withRelated: [
        'bestManagementPractices',
        'layer',
        'status',
        'retrofitType',
        'feasability',
        'designDifficulty',
        'watershedBenefit',
        'priority'
      ]
    }).then(result => {
      console.log(result.toCSV({pretty: true}));
      // result.toJSON({pretty: true});
      res.render('layers');
    });
  // return Models.Stormwaters.query(qb => {
  //   qb.select();
  // }).fetchAll({
  //   withRelated: [
  //     'bmpTypes',
  //     'layer',
  //     'status',
  //     'retroType',
  //     'feasability',
  //     'dsgnDfclt',
  //     'wtrshdBft',
  //     'priority'
  //   ]
  // }).then(result => {
  //   console.log(_.keys(result));
  //   result.toCSV();
  //   // _.forEach(result.models, r => {
  //   //   // console.log(r.toJSON());
  //   //   // r._processAttributes();
  //   //   console.log(r.toCSV({allowPrivate: false, collapse: true}));
  //   // });
  //   // res.locals.rows = result.toJSON();
  //   res.render('layers');
  // });
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
