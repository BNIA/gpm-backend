var baseModel = require('./base');

require('./boundary');

var Csa = baseModel.Model.extend({
  tableName: 'csas',
  hasTimestamps: true,
  boundary: function() {
    return this.belongsTo('Boundary');
  },
  layers: function() {
    return this.hasMany('Layer');
  }
});

var Csas = baseModel.Collection.extend({model: Csa});

module.exports = {
  Csa: baseModel.model('Csa', Csa),
  Csas: baseModel.collection('Csas', Csas)
};
