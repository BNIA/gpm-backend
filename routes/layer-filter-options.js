var express = require('express');
var router = new express.Router();
var Models = require('../models');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  return Models.LayerFilterOptions.query(qb => qb.select())
  .fetch({withRelated: 'layerFilter'})
  .then(rows => rows.toJSON({pretty: true}))
  .then(rows => {
    res.json(rows);
    next();
  });
});

router.post('/layers', (req, res, next) => {
  var ids = JSON.parse(req.body.ids);
  Models.LayerFilterOptions.query(qb => qb.whereIn('id', ids))
  .fetch({withRelated: [
    'layerFilter',
    'layerFilter.stormwaterRemediationSites.layer',
    'layerFilter.communityManagedOpenSpaces.layer'
  ]}).then(collection => collection.models).map(model => {
    var lft = model.get('layer_detail_type');
    var r = model.related('layerFilter');
    if (lft === 'community_managed_open_spaces') {
      r = r.related('communityManagedOpenSpaces')
        .models.map(m => m.related('layer'));
    } else if (lft === 'stormwater_remediation_sites') {
      r = r.related('stormwaterRemediationSites')
        .models.map(m => m.related('layer'));
    } else {
      r = r.related('layers').models.map(m => m);
    }
    return r;
  })
  .map(models => _.map(models, m => m.get('id')))
  .reduce((result, array) => _.union(array, result), [])
  .then(ids => Models.Layers.query(qb => qb.whereIn('id', ids)).fetch())
  .then(collection => collection.toGeoJSON({pretty: true}))
  .then(geojson => res.json(geojson)).then(() => {
    next();
  });
});

module.exports = router;
