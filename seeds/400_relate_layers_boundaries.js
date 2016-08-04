exports.seed = function(knex, Promise) {
  var csaQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = ? FROM ??' +
    ' WHERE ST_CONTAINS(??, ??) AND ?? = ?',
    [
      'layers',
      'csa_id',
      'boundary_detail_id',
      'updated_at',
      knex.fn.now(),
      'boundaries',
      'boundaries.geometry',
      'layers.geometry',
      'boundary_detail_type',
      'csas'
    ]
  ).toString();

  var nsaQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = ? FROM ??' +
    ' WHERE ST_CONTAINS(??, ??) AND ?? = ?',
    [
      'layers',
      'nsa_id',
      'boundary_detail_id',
      'updated_at',
      knex.fn.now(),
      'boundaries',
      'boundaries.geometry',
      'layers.geometry',
      'boundary_detail_type',
      'nsas'
    ]
  ).toString();

  var subwatershedQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = ? FROM ??' +
    ' WHERE ST_CONTAINS(??, ??) AND ?? = ?',
    [
      'layers',
      'subwatershed_id',
      'boundary_detail_id',
      'updated_at',
      knex.fn.now(),
      'boundaries',
      'boundaries.geometry',
      'layers.geometry',
      'boundary_detail_type',
      'subwatersheds'
    ]
  ).toString();

  return knex.raw(csaQuery)
    .then(() => {
      return knex.raw(nsaQuery);
    }).then(() => {
      return knex.raw(subwatershedQuery);
    });
};
