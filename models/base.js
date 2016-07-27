var Knex = require('knex');
var Bookshelf = require('bookshelf');
var dbConfig = require('../knexfile.js');
var _ = require('lodash');

var bookshelf = new Bookshelf(new Knex(dbConfig.development));

// To avoid circular dependencies
bookshelf.plugin('registry');

bookshelf.Model = bookshelf.Model.extend({
  permittedAttributes: [],
  toJSON: function(options) {
    var self = this;
    var jsonObj = _.reduce(this.permittedAttributes, (result, p) => {
      result[p] = self.get(p);
      return result;
    }, {});
    return jsonObj;
  },
  toGeoJSON: function(options) {
    var self = this;
    var geo = null;
    if (this.get('geojson') &&
      (_.indexOf(this.permittedAttributes, 'geojson') >= 0)) {
      geo = self.get('geojson');
      geo.properties = _.reduce(self.permittedAttributes, (result, p) => {
        if (p !== 'geojson') {
          result[p] = self.get(p);
        }
        return result;
      }, {});
    }
    return geo;
  }
});

bookshelf.Collection = bookshelf.Collection.extend({
  toGeoJSON: function(options) {
    return _.map(this.models, m => {
      return m.toGeoJSON(options);
    });
  }
});

module.exports = bookshelf;
