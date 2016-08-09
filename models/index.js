var _ = require('lodash');

var models = [
  'bmp-type',
  'boundary',
  'community-managed-open-space',
  'community-statistical-area',
  'dsgn-dfclt',
  'feasability',
  'image',
  'layer-filter-option',
  'layer',
  'neighborhood-statistical-area',
  'priority',
  'retro-type',
  'site-use',
  'source',
  'status',
  'stormwater-remediation-site',
  'subwatershed',
  'wtrshd-bft',
  'vital-signs-color',
  'vital-signs-data-break',
  'vital-signs-data-point',
  'vital-signs-indicator',
  'vital-signs-section'
];

module.exports = _.reduce(models, (res, model) => {
  return _.assign(res, require('./' + model));
}, {});
