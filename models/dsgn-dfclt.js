var baseModel = require('./base');

var DesignDifficulty = baseModel.Model.extend({
  tableName: 'dsgn_dfclts',
  visible: ['name', 'description'],
  prettyValues: ['name'],
  stormwaterRemediationSites: function() {
    return this.hasMany('StormwaterRemediationSite');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var DesignDifficulties = baseModel.Collection.extend({
  model: DesignDifficulty
});

module.exports = {
  DesignDifficulty:
  baseModel.model('DesignDifficulty', DesignDifficulty),
  DesignDifficulties:
  baseModel.collection('DesignDifficulties', DesignDifficulties)
};
