var _ = require('lodash');
var pgArray = require('postgres-array');

exports.seed = function(knex, Promise) {
  return knex('cmoss')
  .select([
    'site_id',
    'data_date',
    'layers.id',
    'layers.layer_detail_id'
  ])
  .leftJoin('layers', 'layer_detail_id', 'cmoss.id')
  .where({layer_detail_type: 'cmoss'})
  .then(rows => {
    var grouped = _.groupBy(rows, 'site_id');
    var dupes = _.reduce(grouped, (result, g) => {
      if (g.length <= 1) {
        return result;
      } else if (g.length > 1) {
        g = _.sortBy(g, 'data_date').reverse();
        result.push(g);
        return result;
      }
    }, []);
    var toUpdate = [];
    var toDelete = [];
    _.forEach(dupes, d => {
      var update = _.assign({}, d[0]);
      var rest = _.tail(d);
      update.replace_cmoss_ids = _.map(rest, r => {
        return r.layer_detail_id;
      });
      update.replace_layer_ids = _.map(rest, r => {
        return r.id;
      });
      toUpdate.push(update);
      _.forEach(rest, r => {
        toDelete.push(r);
      });
    });
    return [toUpdate, toDelete];
  }).spread((toUpdate, toDelete) => {
    return Promise.map(toUpdate, u => {
      return Promise.map(u.replace_cmoss_ids, id => {
        return knex('cmoss_site_uses')
          .update({
            cmos_id: u.layer_detail_id
          }).where({
            cmos_id: id
          });
      })
      .then(() => {
        return Promise.map(u.replace_layer_ids, id => {
          return knex('layers_sources')
            .update({
              layer_id: u.id
            }).where({
              layer_id: id
            });
        });
      });
    }).then(() => {
      var q = knex.raw(
        'DELETE FROM ?? ' +
        'WHERE ?? IN (' +
        'SELECT ?? FROM (' +
        'SELECT ??, ROW_NUMBER() OVER (' +
        'PARTITION BY ??, ?? ' +
        'ORDER BY ?? ' +
        ') AS ?? FROM ??' +
        ') ?? WHERE ?? > 1' +
        ')',
        [
          'cmoss_site_uses',
          'id',
          'id',
          'id',
          'site_use_id',
          'cmos_id',
          'id',
          'rnum',
          'cmoss_site_uses',
          't',
          't.rnum'
        ]
      );
      return knex.raw(q.toString());
    }).then(() => {
      var q = knex.raw(
        'DELETE FROM ?? ' +
        'WHERE ?? IN (' +
        'SELECT ?? FROM (' +
        'SELECT ??, ROW_NUMBER() OVER (' +
        'PARTITION BY ??, ?? ' +
        'ORDER BY ?? ' +
        ') AS ?? FROM ??' +
        ') ?? WHERE ?? > 1' +
        ')',
        [
          'layers_sources',
          'id',
          'id',
          'id',
          'source_id',
          'layer_id',
          'id',
          'rnum',
          'layers_sources',
          't',
          't.rnum'
        ]
      );
      return knex.raw(q.toString());
    }).return([toUpdate, toDelete]);
  }).spread((toUpdate, toDelete) => {
    return Promise.map(toDelete, d => {
      return knex('cmoss')
        .del()
        .where({id: d.layer_detail_id})
        .return(d);
    }).map(d => {
      return knex('layers')
        .del()
        .where({id: d.id});
    }).return(toUpdate);
  });
};
