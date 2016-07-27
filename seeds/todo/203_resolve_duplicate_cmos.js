var _ = require('lodash');
var pgArray = require('postgres-array');

exports.seed = function(knex, Promise) {
  return knex('cmoss')
  .select([
    'site_id',
    'site_use',
    'source',
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
      update.site_use = pgArray.parse(update.site_use);
      update.site_use = _.reduce(rest, (result, r) => {
        result = _.union(result, pgArray.parse(r.site_use));
        return result;
      }, update.site_use);
      update.source = pgArray.parse(update.source);
      update.source = _.reduce(rest, (result, r) => {
        result = _.union(result, pgArray.parse(r.source));
        return result;
      }, update.source);
      toUpdate.push(update);
      _.forEach(rest, r => {
        toDelete.push(r);
      });
    });
    return [toUpdate, toDelete];
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
  }).map(u => {
    return knex('cmoss')
      .update({
        site_use: u.site_use,
        updated_at: knex.fn.now()
      }).where({
        id: u.layer_detail_id
      }).return(u);
  }).map(u => {
    return knex('layers')
      .update({
        source: u.source,
        updated_at: knex.fn.now()
      }).where({
        id: u.id
      });
  });
};
