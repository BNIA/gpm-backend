var express = require('express');
var router = new express.Router();
var Models = require('../models');

router.get('/', (req, res, next) => {
  return Models.LayerFilterOption.fetchAll({
    debug: true,
    withRelated: 'layerFilter'
  }).then(rows => {
    return rows.map(row => {
      return {
        id: row.get('id'),
        layer_detail_type: row.get('layer_detail_type'),
        layer_filter_type: row.get('layer_filter_type'),
        layer_filter_id: row.get('layer_filter_id'),
        name: row.related('layerFilter').get('name'),
        description: row.related('layerFilter').get('description')
      };
    });
  }).then(rows => {
    res.json(rows);
    next();
  });
});

module.exports = router;
