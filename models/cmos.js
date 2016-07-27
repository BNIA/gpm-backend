var baseModel = require('./base');

var Cmos = baseModel.Model.extend({
  tableName: 'cmoss',
  hasTimestamps: true,
  layer: function() {
    return this.morphOne('Layer', 'layer_detail');
  }
});

var Cmoss = baseModel.Collection.extend({model: Cmos});

module.exports = {
  Cmos: baseModel.model('Cmos', Cmos),
  Cmoss: baseModel.collection('Cmoss', Cmoss)
};
