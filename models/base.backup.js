var Knex = require('knex');
var Bookshelf = require('bookshelf');
var dbConfig = require('../knexfile.js');
var _ = require('lodash');
var inflection = require('inflection');

var bookshelf = new Bookshelf(new Knex(dbConfig.development));

// To avoid circular dependencies
bookshelf.plugin('registry');

bookshelf.Model = bookshelf.Model.extend({
  visible: [], // attributes visibile to the client
  prettyAtrributeNames: {}, // human readable attr names
  prettyName: null,
  defaultCsvOptions: {},
  defaultJsonOptions: {
    pretty: true,
    privateAttributes: false,
    collapse: true,
    stringify: false
  },
  defaultGeoJsonOptions: {},
  _processAttributes: function(options) {
    var self = this;
    options = options || {};
    var attributes = _.assign({}, this.attributes);
    if (options.privateAttributes === false) {
      attributes = _.pick(attributes, this.visible);
    }
    if (options.pretty === true) {
      var pretty = _.mapKeys(attributes, (value, key) => {
        if ((self.prettyAttributeNames !== undefined) &&
        self.prettyAttributeNames[key] !== undefined) {
          key = self.prettyAttributeNames[key];
        }
        return key;
      });
      attributes = pretty;
      // pretty = _.mapValues(attributes, v => {
      //   if (typeof v === 'string') {
      //     v = _.capitalize(v);
      //   }
      //   return v;
      // });
      attributes = pretty;
    }

    var relationModels = {};
    var relationCollections = {};

    _.forEach(this.relations, (value, key) => {
      if (value.length === undefined) {
        relationModels[key] = value;
      } else {
        relationCollections[key] = value;
      }
    });

    _.forEach(relationModels, (model, relationName) => {
      if ((options.pretty === true) && (model.prettyName !== null) &&
      (model.prettyName !== undefined)) {
        relationName = model.prettyName;
      }

      if (options.collapse === false) {
        var i = 1;
        var key = relationName;
        var attrKeys = _.keys(attributes);
        while (_.findIndex(attrKeys, key) >= 0) {
          if (options.pretty === true) {
            key = relationName + " " + i;
          } else {
            key = relationName + "_" + i;
          }
          i += 1;
        }
        attributes[key] = model._processAttributes(options);
      } else {
        var modelAttributes = model._processAttributes(options);
        _.forEach(modelAttributes, (v, k) => {
          var i = 1;
          if ((options.pretty === true) &&
          (model.prettyName !== undefined)) {
            k = model.prettyName + " " + k;
          } else {
            k = model.tableName + "_" + k;
          }
          var attrKeys = _.keys(attributes);
          while (_.findIndex(attrKeys, k) >= 0) {
            if (options.pretty === true) {
              k = k + " " + i;
            } else {
              k = k + "_" + i;
            }
          }
          attributes[k] = v;
        });
      }
    });

    _.forEach(relationCollections, (collection, collectionName) => {
      console.log(collectionName);
      console.log(collection);
      console.log(collection.prettyName);
      console.log();
      if (collection.models.length > 0) {
        _.forEach
        if ((options.pretty === true) &&
        (collection.prettyName !== null) &&
        (collection.prettyName !== undefined)) {
          collectionName = inflection.pluralize(collection.prettyName);
        }
        if (options.collapse === false) {
          var i = 1;
          var key = collectionName;
          // console.log(collectionName);
          var attrKeys = _.keys(attributes);
          while (_.findIndex(attrKeys, key) >= 0) {
            if (options.pretty === true) {
              key = collectionName + " " + i;
            } else {
              key = collectionName + "_" + i;
            }
            i += 1;
          }
          attributes[key] = _.map(collection.models, model => {
            return model._processAttributes(options);
          });
        } else {
          var collectionAttributes = _.map(collection.models, model => {
            return model._processAttributes(options);
          });
          // console.log(collectionAttributes);
          var collectionKeys = _.reduce(collectionAttributes, (result, obj) => {
            result = _.union(result, _.keys(obj));
            return result;
          }, []);
          var newObj = _.reduce(collectionKeys, (result, ck) => {
            _.forEach(collectionAttributes, obj => {
              if (obj[ck]) {
                if (result[ck] === undefined) {
                  result[ck] = [obj[ck]];
                } else {
                  result[ck].push(obj[ck]);
                }
              }
            });
            return result;
          }, {});
          newObj = _.mapKeys(newObj, (v, k) => {
            var cname = "";
            if (options.pretty === true) {
              if (collection.prettyName !== undefined &&
              collection.prettyName !== null) {
                cname = inflection.singularize(collection.prettyName);
                k = inflection.pluralize(cname + " " + k);
              } else {
                cname = inflection.singularize(collectionName);
                k = inflection.pluralize(cname + " " + k);
              }
            } else {
              cname = inflection.singularize(collectionName);
              k = inflection.pluralize(cname + "_" + k);
            }
            return k;
          });
          // console.log(newObj);
        }
      }
    });
    return attributes;
  },
  toJSON: function(options) {
    var options = options || {};
    options = _.assign(this.defaultJsonOptions, options);
    return this._processAttributes(options);
    // var self = this;
    // options = options || {};
    // options = _.assign(this.defaultJsonOptions, options);
    //
    // var attributes = _.assign({}, this.attributes);
    // attributes = _.mapKeys(attributes, (value, key) => {
    //   if (self.prettyAtrributeNames[key]) {
    //     key = self.prettyAttributeNames[key];
    //   }
    //   return key;
    // });
    // attributes = _.pick(attributes, this.visible);
    // _.forEach(this.relations, (model, relationName) => {
    //   attributes[relationName] = model.toJSON();
    // });
    // // console.log(_.keys(this.relations));
    // return attributes;
  },
  toGeoJSON: function(options) {
    var attributes = this.toJSON();
    options = options || {};
    options = _.assign(this.defaultGeoJsonOptions, options);
    var properties = _.omit(attributes, 'geojson');
    var geometry = this.get('geojson') || {};
    return {
      type: "Feature",
      geometry: geometry,
      properties: properties
    };
  },
  toCSV: function(options) {},
  toString: function(options) {
    return this.get('id') || "";
  }
  //   var colNames = _.intersection(_.keys(this.attributes),
  //     this.visible);
  //   if (options.omit) {
  //     colNames = _.difference(colNames, options.omit);
  //   }
  //   var rowVals = _.values(_.pick(this.attributes, colNames));
  //   _.forEach(this.relations, (model, relationName) => {
  //     _.forEach(model.attributes, (val, key) => {
  //       if(_.findIndex(colNames, key) > 0) {
  //         var newColName = relationName + "_" + key;
  //         colNames.push(newColName);
  //       } else {
  //         colNames.push(key);
  //       }
  //       rowVals.push()
  //     });
  //   });
  //   var resultStr = rowVals.join(", ");
  //   if (options.header) {
  //     var prettyColNames = _.map(colNames, c => {
  //       if (self.prettyAttributeNames[c]) {
  //         c = self.prettyAtrributeNames[c];
  //       }
  //       return c;
  //     });
  //     resultStr = prettyColNames.join(", ") + "\n" + resultStr;
  //   }
  //   return resultStr;
  // }
}, {});

bookshelf.Collection = bookshelf.Collection.extend({
  prettyName: null,
  prettyAttributeNames: {},
  toGeoJSON: function(options) {
    var features = _.map(this.models, m => {
      return m.toGeoJSON(options);
    });
    return {
      type: "FeatureCollection",
      features: features
    };
  },
  toCSV: function(options) {
    var self = this;
    options = options || {};
    var childOptions = _.assign({}, [
      options.omit
    ]);
    var rows = _.map(this.models, m => {
      return m.toCSV(childOptions);
    });
    var resultStr = rows.join('\n');
    if (options.header) {
      var colNames = _.intersection(_.keys(this.attributes),
        this.visible);
      var prettyColNames = _.map(colNames, c => {
        if (self.prettyAttributeNames[c]) {
          c = self.prettyAtrributeNames[c];
        }
        return c;
      });
      resultStr = prettyColNames.join(", ") + "\n" + resultStr;
    }
    return resultStr;
  },
  toString: function(options) {
    var arr = _.map(this.models, m => {
      return m.toString();
    });
    var resultStr = arr.split(", ");
    return resultStr;
  }
});


// dealing with public/private attributes
if (options.allowPrivate) {
  if (options.omitNull) {
    obj = _.reduce(this.attributes, (res, attr, name) => {
      if (attr !== null) {
        res[name] = attr;
      }
      return res;
    }, {});
  } else {
    obj = _.assign(obj, this.attributes);
  }
} else if (options.omitNull) {
  obj = _.reduce(this.publicAttributes, (res, attr, name) => {
    if (attr !== null) {
      res[name] = attr;
    }
    return res;
  }, {});
} else {
  obj = _.assign(obj, this.publicAttributes);
}


toString: function() {
  var res = "";
  if (!(_.isNil(this.get('name')))) {
    res = this.get('name');
  } else if (!(_.isNil(this.get('id')))) {
    res = this.get('id');
  }
  return res;
}

toString: function() {
  var arr = _.map(this.models, m => {
    return m.toString();
  });
  return arr.join(', ');
}


module.exports = bookshelf;
