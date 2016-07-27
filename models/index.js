var _ = require('lodash');

var models = [
  'bmp-type',
  'boundary',
  'cmos',
  'csa',
  'dsgn-dfclt',
  'feasability',
  'image',
  'layer-filter-option',
  'layer',
  'nsa',
  'priority',
  'retro-type',
  'site-use',
  'source',
  'status',
  'stormwater',
  'subwatershed',
  'wtrshd-bft'
];

module.exports = _.reduce(models, (res, model) => {
  return _.assign(res, require('./' + model));
}, {});
