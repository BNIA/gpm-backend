var fs = require('fs');
var path = require('path');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/csas.geojson');
  var data = JSON.parse(fs.readFileSync(dataPath));
  var features = data.features;

  // Delete all csas
  return knex.select('boundary_id').from('boundaries.csas').map(row => {
    return knex('boundaries')
      .del().where({id: row.boundary_id});
  }).then(() => {
    return knex('boundaries.csas').del();
  }).then(() => {
      // Insert the geojson, and metadata from geojson
    return Promise.map(features, feature => {
      var name = feature.properties.name;
      var geojson = feature.geometry;
      return knex('boundaries').insert({
        name,
        geojson
      })
      .returning('id')
      .then(id => {
        return knex('boundaries.csas')
        .insert({boundary_id: id[0]});
      });
    });
  })
    .then(() => {
      // Update geometry column
      return knex.raw(
        "UPDATE ?? SET ?? = ST_GeomFromGeoJSON(??::text)",
        ['boundaries', 'geometry', 'geojson']
      );
    })
    .then(() => {
      // Update timestamps
      return knex.raw('UPDATE ?? SET ?? = CURRENT_TIMESTAMP',
        ['boundaries', 'updated_at']
      );
    })
    .then(() => {
      // Update timestamps
      return knex.raw('UPDATE ?? SET ?? = CURRENT_TIMESTAMP',
        ['boundaries.csas', 'updated_at']
      );
    });
};
