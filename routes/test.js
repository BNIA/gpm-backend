var express = require('express');
var router = new express.Router();
var Models = require('../models');

router.get('/', (req, res, nex) => {

  return Models.VitalSignsIndicator.query(qb => qb.select())
    .fetchAll({
      withRelated: [
        'vitalSignsDataPoint.vitalSignsDataBreak.vitalSignsColor'
      ]
    }).then(data => {
      return data.toJSON({collapse: true, pretty: true});
    }).then(data => {
      console.log(data);
    });

  // return Models.LayerFilterOption.where('layer_filter_type', 'priorities')
  //   .fetch({
  //     withRelated: ['layerFilter.stormwaters']
  //   }).then(sw => {
  //     res.json(sw);
  //     console.log(sw);
  //   });

  // return Models.LayerFilterOptions.fetch({}).then(d => {
  //   return d.toJSON();
  // }).then(d => {
  //   console.log(d);
  //   res.json(d);
  // });

  // return Models.LayerFilterOption.where('layer_filter_type', 'priorities')
  //   .then(d => {
  //     console.log(d);
  //     return d.toJSON();
  //   }).then(d => {
  //     console.log(d);
  //     res.json(d);
  //   });

  // return Models.Stormwater.where('id', 243)
  //   .fetch({
  //     withRelated: ['bmpTypes', 'layer.sources']
  //   })
  //   .then(sw => {
  //     res.json(sw);
  //     console.log(sw.related('bmpTypes'));
  //   });

  // var p = new Models.Stormwater({
  //   status: 'active'
  // });
  //
  // p.fetchAll({
  //   debug: true
  // }).then(result => {
  //   res.json(result);
  // });
  // return Models.Stormwater.query(qb => {
  //   qb.select();
  // }).fetchAll({
  //   debug: true
  // }).then(result => {
  //   res.json(result);
  // });
});

module.exports = router;
