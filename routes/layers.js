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

router.post('/layer_detail', (req, res, next) => {
  var id = JSON.parse(req.body.id);
  console.log(id);
  return new Models.Layers().query('where', 'id', '=', id).fetch({
    withRelated: [
      'layerDetail.bestManagementPractices',
      'layerDetail.status',
      'layerDetail.retrofitType',
      'layerDetail.feasability',
      'layerDetail.designDifficulty',
      'layerDetail.watershedBenefit',
      'layerDetail.priority',
      'layerDetail.siteUses',
      'sources'
    ],
    debug: true
  }).catch(error => {
    console.log(id);
    throw error;
  }).then(model => {
    var obj = model.toJSON({
      pretty: true, collapse: true
    });
    obj = obj[0];
    console.log(obj);
    res.json(obj);
    next();
  });
});

router.post('/download', (req, res, next) => {
  var fileType = req.body.type;
  var ids = req.body.ids;
  return new Models.Layers().query(qb => qb.whereIn('id', ids))
  .fetch({
    withRelated: [
      'layerDetail.bestManagementPractices',
      'layerDetail.status',
      'layerDetail.retrofitType',
      'layerDetail.feasability',
      'layerDetail.designDifficulty',
      'layerDetail.watershedBenefit',
      'layerDetail.priority',
      'layerDetail.siteUses',
      'sources'
    ]
  }).then(collection => {
    var result = {};
    if (fileType === 'csv') {
      result = collection.toCSV({pretty: true});
    } else if (fileType === 'json') {
      result = collection.toJSON({pretty: true});
    } else if (fileType === 'geojson') {
      result = collection.toGeoJSON({pretty: true});
    }
    return result;
  }).then(data => {
    res.json(data);
    next();
  });
});

module.exports = router;
