var fs = require('fs');
var path = require('path');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname,
  './data/community_statistical_areas.geojson');
  var data = JSON.parse(fs.readFileSync(dataPath));
  var features = data.features;

  return knex('boundaries').del().where({
    boundary_detail_type: 'community_statistical_areas'
  }).then(() => {
    return knex('community_statistical_areas').del().return(features);
  }).map(feature => {
    return knex('community_statistical_areas')
      .insert({
        updated_at: knex.fn.now()
      })
      .returning('id')
      .then(id => {
        feature.boundary_detail_id = parseInt(id, 10);
        return feature;
      });
  }).map(feature => {
    feature.geojson = {
      type: "Feature",
      geometry: feature.geometry
    };
    return feature;
  }).map(feature => {
    return knex('boundaries').insert({
      name: feature.properties.name,
      geojson: feature.geojson,
      boundary_detail_type: 'community_statistical_areas',
      boundary_detail_id: feature.boundary_detail_id,
      geometry: knex.raw('ST_SetSRID(ST_GeomFromGeoJSON(?::text), ?)',
        [feature.geometry, '4326']),
      updated_at: knex.fn.now()
    });
  });
};
