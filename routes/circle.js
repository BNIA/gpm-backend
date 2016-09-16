var express = require('express');
var router = new express.Router();
var dbConfig = require('../knexfile.js');
var Knex = require('knex');
var knex = new Knex(dbConfig.development);
var _ = require('lodash');

router.post('/', (req, res, next) => {
  var point = req.body.point;
  // var q = knex.raw(
  // ]);
  return knex.first(knex.raw(
    'ST_AsGeoJSON(ST_BUFFER(ST_SetSRID(ST_MakePoint(?,?), ?), ?)) as circle', [
    point.lng, point.lat, '4326', '.015'
  ])).then(data => {
    return data.circle;
  }).then(d => {
    console.log(d);
    var d = JSON.parse(d);
    coords = d.coordinates;
    var geom = {
      type: "Polygon",
      coordinates: coords,
    };
    console.log(geom);
    data = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: geom,
        properties: {
          is_circle: true
        }
      }]
    };
    res.json(data);
    next();
  });
});

module.exports = router;
