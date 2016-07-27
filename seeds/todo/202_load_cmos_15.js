var helpers = require('./helpers');
var path = require('path');
var _ = require('lodash');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/cmoss_15.csv');
  var cmoss = helpers.readCsv(dataPath);

  return knex('layers').select('layer_detail_id', 'id').where({
    layer_detail_type: 'cmoss',
    data_date: '2015-01-01'
  }).map(row => {
    return knex('cmoss').del().where({
      id: row.layer_detail_id
    }).return(row);
  }).map(row => {
    return knex('layers').del().where({
      id: row.id
    });
  }).return(cmoss).map(row => {
    // Any Modifications here
    row.site_use = row.site_use === null ? [] : row.site_use.split(', ');
    row.source = row.source === null ? [] : row.source.split(', ');
    row.address = _.startCase(row.address);
    row.name = _.startCase(row.name);
    return row;
  }).map(row => {
    return knex('cmoss').insert({
      name: row.name,
      address: row.address,
      block: row.block,
      lot: row.lot,
      site_use: row.site_use,
      updated_at: knex.fn.now()
    }).returning('id').then(id => {
      row.layer_detail_id = parseInt(id, 10);
      return row;
    });
  }).map(row => {
    return knex('layers').insert({
      site_id: row.site_id,
      geojson: row.geojson,
      source: row.source,
      data_date: '2015-01-01',
      layer_detail_type: 'cmoss',
      layer_detail_id: row.layer_detail_id,
      geometry: knex.raw('ST_SetSRID(ST_Point(?,?),?)', [
        row.point_x, row.point_y, '4326'
      ]),
      updated_at: knex.fn.now()
    });
  });
};
