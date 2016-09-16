var fs = require('fs');
var path = require('path');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/subwatersheds.geojson');
  var data = JSON.parse(fs.readFileSync(dataPath));
  var features = data.features;

  return knex('boundaries').del().where({
    boundary_detail_type: 'subwatersheds'
  }).then(() => {
    return knex('subwatersheds').del().return(features);
  }).map(feature => {
    return knex('subwatersheds')
      .insert({
        mde6name: feature.properties.mde6name,
        mde8name: feature.properties.mde8name,
        mde6digt: feature.properties.mde6digt,
        mde8digt: feature.properties.mde8digt,
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
      geojson: knex.raw('(?||ST_AsGeoJSON(st_transform(st_simplify(st_transform(ST_SetSRID(ST_GeomFromGeoJSON(?::text), ?), ?), ?), ?))||?)::json',
        ['{"type":"Feature","geometry":', feature.geometry,'4326', '2249', '300', '4326', '}']),
      boundary_detail_type: 'subwatersheds',
      boundary_detail_id: feature.boundary_detail_id,
      geometry: knex.raw('st_transform(st_simplify(st_transform(ST_SetSRID(ST_GeomFromGeoJSON(?::text), ?), ?), ?), ?)',
        [feature.geometry, '4326', '2249', '300', '4326']),
      updated_at: knex.fn.now()
    });
  });
};
