var helpers = require('./helpers');
var path = require('path');
// var _ = require('lodash');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/stormwater.csv');
  // Delete all csas
  return knex.select('layer_id').from('layers.stormwaters').map(row => {
    return knex('layers')
      .del().where({id: row.layer_id});
  }).then(() => {
    return knex('layers.stormwaters').del();
  }).then(() => {
    return helpers.readCsv(dataPath);
  })
    .map(row => {
      // Any modifications
      row.bmp_type = row.bmp_type === null ? [] : row.bmp_type.split(', ');
      row.geojson = {
        type: 'Point',
        coordinates: [row.point_x, row.point_y]
      };
      return row;
    })
    .map(row => {
      // insert into the layers table
      return knex('layers')
        .insert({
          site_id: row.site_id,
          geojson: row.geojson,
          source: row.source
        })
        .returning('id')
        .then(id => {
          row.layer_id = parseInt(id, 10);
          return row;
        });
    })
    .map(row => {
      // Update the geom
      var query = knex.raw(
        "UPDATE ?? SET ?? = ST_MakePoint(?,?) WHERE ?? = ?",
        ['layers', 'geometry', row.point_x, row.point_y, 'id', row.layer_id]
      ).toString();
      return knex.raw(query).return(row);
    })
    .map(row => {
      // insert into the layers.stormwaters table
      return knex('layers.stormwaters')
        .insert({
          layer_id: row.layer_id,
          name: row.name,
          address: row.address,
          status: row.status,
          bmp_type: row.bmp_type,
          site_use: row.site_use,
          drain_acres: row.drain_acres,
          imp_acres: row.imp_acres,
          imp_percent: row.imp_percent,
          an_runoff: row.an_runoff,
          retro_type: row.retro_type,
          feasability: row.feasability,
          dsgn_dfclt: row.dsgn_dfclt,
          wtrshd_bft: row.wtrshd_bft,
          priority: row.priority
        })
        .returning('layer_id')
        .then(id => {
          return parseInt(id, 10);
        });
    })
    .map(id => {
      // Update timestamps
      var query = knex.raw('UPDATE ?? SET ?? = CURRENT_TIMESTAMP WHERE ?? = ?',
        ['layers', 'updated_at', 'id', id]
      ).toString();
      return knex.raw(query);
    })
    .then(id => {
      var query = knex.raw('UPDATE ?? SET ?? = CURRENT_TIMESTAMP',
        ['layers.stormwaters', 'updated_at']
      ).toString();
      return knex.raw(query);
    });
};
