var baseModel = require('./base');

require('./boundary');

var Nsa = baseModel.Model.extend({
  tableName: 'nsas',
  hasTimestamps: true,
  boundary: function() {
    return this.belongsTo('Boundary');
  },
  layers: function() {
    return this.hasMany('Layer');
  }
});

var Nsas = baseModel.Collection.extend({model: Nsa});

module.exports = {
  Nsa: baseModel.model('Nsa', Nsa),
  Nsas: baseModel.collection('Nsas', Nsas)
};
