var express = require('express');
var router = new express.Router();
var Models = require('../models');
var _ = require('lodash');
console.log('layer-filter-options-routes');
router.get('/', (req, res, next) => {
  console.log('layer-filter-options-routes-GET');
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
  var opts = JSON.parse(req.body.options);
  console.log('layer-filter-options-routes-POST');
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
  .then(ids => Models.Layers.query(qb => {
    qb.whereIn('id', ids);
    console.log ('routes/ layer filter ids:' + id);
    if (opts.radius) {
      qb.whereRaw('ST_DWithin(??, ST_SetSRID(ST_MakePoint(?,?), ?), ?)',
    ['geometry', opts.radius.lng, opts.radius.lat, '4326', '.015']);
    }
  }).fetch({
    withRelated: 'layerDetail.status'
  }))
  .then(collection => collection.toGeoJSON({pretty: true}))
  .then(geojson => {
    return geojson;
  })
  .then(geojson => res.json(geojson)).then(() => {

    next();
  });
});

module.exports = router;
