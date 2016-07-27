var helpers = require('./helpers');
var path = require('path');
// var _ = require('lodash');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/stormwaters_13.csv');
  var data = helpers.readCsv(dataPath);

  return knex('layers').select('id').where({layer_detail_type: 'stormwaters'})
  .map(row => {
    return knex('layers_sources').del().where({layer_id: row.id});
  }).then(() => {
    return knex('layers').del().where({
      layer_detail_type: 'stormwaters'
    });
  }).then(() => {
    return knex('bmp_types_stormwaters').del();
  }).then(() => {
    return knex('stormwaters').del().return(data);
  }).map(row => {
    // Any Modifications go here
    row.bmp_type_ids = row.bmp_type_ids === null ?
      [] : row.bmp_type_ids.split(', ');
    row.source_ids = row.source_ids === null ?
      [] : row.source_ids.split(', ');
    row.geojson = {
      type: 'Point',
      coordinates: [row.point_x, row.point_y]
    };
    return row;
  }).map(row => {
    return knex('stormwaters')
      .insert({
        name: row.name,
        address: row.address,
        status_id: row.status_id,
        // bmp_type_id: row.bmp_type,
        site_use: row.site_use,
        drain_acres: row.drain_acres,
        imp_acres: row.imp_acres,
        imp_percent: row.imp_percent,
        an_runoff: row.an_runoff,
        retro_type_id: row.retro_type_id,
        feasability_id: row.feasability_id,
        dsgn_dfclt_id: row.dsgn_dfclt_id,
        wtrshd_bft_id: row.wtrshd_bft_id,
        priority_id: row.priority_id,
        updated_at: knex.fn.now()
      })
      .returning('id')
      .then(id => {
        row.stormwater_id = parseInt(id, 10);
        return row;
      });
  }).map(row => {
    return Promise.map(row.bmp_type_ids, id => {
      return knex('bmp_types_stormwaters').insert({
        bmp_type_id: id,
        stormwater_id: row.stormwater_id
      });
    }).return(row);
  }).map(row => {
    return knex('layers').insert({
      data_date: '2013-01-01',
      layer_detail_id: row.stormwater_id,
      layer_detail_type: 'stormwaters',
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
