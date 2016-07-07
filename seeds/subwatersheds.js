var fs = require('fs');
var path = require('path');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/subwatersheds.geojson');
  var data = JSON.parse(fs.readFileSync(dataPath));
  var features = data.features;

  // Delete ALL existing entries that are csas
  return knex('boundaries.subwatersheds').del()
    .then(() => {
      // Insert the geojson, and metadata from geojson
      return Promise.map(features, feature => {
        var name = feature.properties.name;
        var geojson = feature.geometry;
        var mde6name = feature.properties.mde6name;
        var mde8name = feature.properties.mde8name;
        var mde6digt = feature.properties.mde6digt;
        var mde8digt = feature.properties.mde8digt;
        return knex('boundaries')
          .insert({name, geojson})
          .returning('id')
          .then(id => {
            return knex('boundaries.subwatersheds')
            .insert({
              boundary_id: id[0],
              mde6name: mde6name,
              mde8name: mde8name,
              mde6digt: mde6digt,
              mde8digt: mde8digt
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
        ['boundaries.subwatersheds', 'updated_at']
      );
    });
};
