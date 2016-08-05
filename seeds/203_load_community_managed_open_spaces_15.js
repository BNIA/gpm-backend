var helpers = require('./helpers');
var path = require('path');
// var _ = require('lodash');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname,
    './data/load_community_managed_open_spaces_15.csv');
  var data = helpers.readCsv(dataPath);

  return knex('layers').select('id', 'layer_detail_id').where({
    layer_detail_type: 'community_managed_open_spaces',
    data_date: '2015-01-01'
  })
  .map(row => {
    return knex('layers_sources').del().where({layer_id: row.id}).return(row);
  }).map(row => {
    return knex('layers').del().where({
      id: row.id
    }).return(row);
  }).map(row => {
    return knex('community_managed_open_spaces_site_uses').del().where({
      community_managed_open_spaces_id: row.layer_detail_id
    }).return(row);
  }).map(row => {
    return knex('community_managed_open_spaces').del().where({
      id: row.layer_detail_id
    });
  }).return(data).map(row => {
    row.site_use_ids = row.site_use_ids === null ?
         [] : row.site_use_ids.split(', ');
    row.source_ids = row.source_ids === null ?
      [] : row.source_ids.split(', ');
    row.geojson = {
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: [row.point_x, row.point_y]
      }
    };
    return row;
  }).map(row => {
    return knex('community_managed_open_spaces')
      .insert({
        name: row.name,
        address: row.address,
        block: row.block,
        lot: row.lot
      })
      .returning('id')
      .then(id => {
        row.community_managed_open_space_id = parseInt(id, 10);
        return row;
      });
  }).map(row => {
    return Promise.map(row.site_use_ids, id => {
      return knex('community_managed_open_spaces_site_uses').insert({
        site_use_id: id,
        community_managed_open_space_id: row.community_managed_open_space_id
      });
    }).return(row);
  }).map(row => {
    return knex('layers').insert({
      data_date: '2015-01-01',
      layer_detail_id: row.community_managed_open_space_id,
      layer_detail_type: 'community_managed_open_spaces',
      site_id: row.site_id,
      geojson: row.geojson,
      geometry: knex.raw('ST_SetSRID(ST_Point(?,?),?)', [
        row.point_x, row.point_y, '4326'
      ]),
      updated_at: knex.fn.now()
    }).returning('id')
      .then(id => {
        row.layer_id = parseInt(id, 10);
        return row;
      });
  }).map(row => {
    return Promise.map(row.source_ids, id => {
      return knex('layers_sources').insert({
        source_id: id,
        layer_id: row.layer_id
      });
    });
  });
};
