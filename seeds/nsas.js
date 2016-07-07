var fs = require('fs');
var path = require('path');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/nsas.geojson');
  var data = JSON.parse(fs.readFileSync(dataPath));
  var features = data.features;

  // Delete ALL existing entries that are csas
  return knex('boundaries.nsas').del()
    .then(() => {
      // Insert the geojson, and metadata from geojson
      return Promise.map(features, feature => {
        var name = feature.properties.name;
        var geojson = feature.geometry;
        var acres = feature.properties.acres;
        var area = feature.properties.area;
        var length = feature.properties.length;
        return knex('boundaries').insert({name, geojson})
        .returning('id')
        .then(id => {
          return knex('boundaries.nsas')
          .insert({
            boundary_id: id[0],
            acres: acres,
            area: area,
            length: length
          });
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
        ['boundaries.nsas', 'updated_at']
      );
    });
};
