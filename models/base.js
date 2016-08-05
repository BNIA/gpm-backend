var Knex = require('knex');
var Bookshelf = require('bookshelf');
var dbConfig = require('../knexfile.js');
var _ = require('lodash');
// var inflection = require('inflection');

var bookshelf = new Bookshelf(new Knex(dbConfig.development));

// To avoid circular dependencies
bookshelf.plugin('registry');
bookshelf.plugin('virtuals');

bookshelf.Model = bookshelf.Model.extend({
  test: function() {
  },
  initialize: function() {
    var self = this;
    this.pretty = this.pretty || {};
    this.prettyValues = this.prettyValues || [];
    this.virtuals = this.virtuals || {};

    this.attributes = _.reduce(this.virtuals, (res, value, key) => {
      res[key] = self.get('key');
      return res;
    }, this.attributes);

    this.prettyTableName = _.startCase(this.tableName);

    this.pretty = _.reduce(_.keys(this.attributes), (res, k) => {
      var val;
      if (self.pretty[k]) {
        val = self.pretty[k];
      } else {
        val = _.startCase(k);
      }
      res[k] = val;

      return res;
    }, {});

    var newVirtuals = _.reduce(this.pretty, (res, value, key) => {
      res[value] = function() {
        return self.get(key);
      };
      return res;
    }, {});

    if (_.isNil(this.visible)) {
      this.publicAttributes = _.assign({}, this.attributes);
    } else {
      this.publicAttributes = _.reduce(
      this.visible, (result, name) => {
        var attr = self.get(name);
        if (attr !== undefined) {
          result[name] = attr;
        }
        return result;
      }, {});
    }
    if (this.hidden) {
      this.publicAttributes = _.omit(this.publicAttributes, this.hidden);
    }

    this.prettyPublicAttributes = _.reduce(
    this.publicAttributes, (res, v, k) => {
      if (_.indexOf(self.prettyValues, k) >= 0) {
        v = _.startCase(v);
      }
      res[k] = v;
      return res;
    }, {});

    this.prettyPublicAttributes = _.mapKeys(
    this.prettyPublicAttributes, (p, k) => {
      return this.pretty[k];
    });

    this.virtuals = _.assign({}, this.virtuals, newVirtuals);
  },
  collapse: function(options) {
    return this.serialize(options);
  },
  serialize: function(options) {
    options = options || {};
    options = _.assign({
      shallow: false,
      omitPivot: false,
      omitNull: true,
      allowPrivate: false,
      collapse: false,
      appendName: false,
      appendedName: this.tableName,
      pretty: false
    }, options);

    var result;
    var attrs;
    var relations;
    var childOpts;

    // Whether to allow private attributes
    if (options.allowPrivate && options.pretty) {
      attrs = _.assign({}, this.attributes);
    } else if (options.allowPrivate) {
      attrs = _.assign({}, this.pretty);
    } else if (options.pretty) {
      attrs = _.assign({}, this.prettyPublicAttributes);
    } else {
      attrs = _.assign({}, this.publicAttributes);
    }

    // Whether to omit null attributes
    if (options.omitNull) {
      attrs = _.reduce(attrs, (res, attr, key) => {
        if (attr !== null) {
          res[key] = attr;
        }
        return res;
      }, {});
    }

    // If collapsing need to append table name on children
    if (options.collapse) {
      childOpts = _.assign({}, options, {appendName: true});
    } else {
      childOpts = _.assign({}, options);
    }

    // if we are doing relations
    if (options.shallow) {
      relations = {};
    } else {
      relations = _.reduce(this.relations, (res, relation, name) => {
        var relObj;
        if (options.pretty) {
          name = _.startCase(name);
        }
        if (options.collapse) {
          childOpts = _.assign({}, childOpts, {appendedName: name});
          relObj = relation.collapse(childOpts);
        } else {
          relObj = relation.serialize(childOpts);
        }
        if (!(_.isEmpty(relObj))) {
          res[name] = relObj;
        }
        return res;
      }, {});
    }

    // if collapsing, collapse json into attributes
    if (options.collapse) {
      result = _.assign({}, attrs);
      _.forEach(relations, relation => {
        result = _.assign({}, result, relation);
      });
    } else {
      result = _.assign({}, attrs, relations);
    }

    // whether we append the table name
    if (options.appendName) {
      result = _.mapKeys(result, (value, key) => {
        var sep = options.pretty ? " " : "_";
        key = options.appendedName + sep + key;
        return key;
      });
    }

    return result;
  },
  toCSV: function(options) {
    options = options || {};
    options = _.assign({}, options, {
      collapse: true
    });
    var obj = this.serialize(options);
    var headVals = _.keys(obj);
    headVals = _.map(headVals, v => {
      return '\\"' + v + '\\"';
    });
    var headLine = headVals.join(", ");
    var row = _.values(obj);
    row = _.map(row, r => {
      return '\\"' + JSON.stringify(r) + '\\"';
    });
    var rowLine = row.join(", ");

    return headLine + "/n" + rowLine;
  },
  toJSON: function(options) {
    return this.serialize(options);
  }
});

bookshelf.Collection = bookshelf.Collection.extend({
  collapse: function(options) {
    var models = _.map(this.models, m => {
      return m.serialize(options);
    });

    var keys = _.reduce(models, (res, model) => {
      var subKeys = _.keys(model);
      return _.union(res, subKeys);
    }, []);

    var result = _.reduce(keys, (res, k) => {
      res[k] = [];
      return res;
    }, {});

    result = _.reduce(models, (res, model) => {
      _.forEach(keys, k => {
        if (model[k] === undefined) {
          res[k].push(null);
        } else {
          res[k].push(model[k]);
        }
      });
      return res;
    }, result);
    return result;
  },
  toCSV: function(options) {
    options = options || {};
    options = _.assign({}, options, {
      collapse: true
    });
    var objs = this.serialize(options);
    var headVals = _.reduce(objs, (res, o) => {
      res = _.union(res, _.keys(o));
      return res;
    }, []);

    console.log(headVals);

    var rowVals = _.reduce(objs, (res, o) => {
      var row = [];
      _.forEach(headVals, v => {
        if (o[v]) {
          row.push(o[v]);
        } else {
          row.push(null);
        }
      });
      res.push(row);
      return res;
    }, []);
    // var headVals = _.keys(obj);
    headVals = _.map(headVals, v => {
      return '\\"' + v + '\\"';
    });
    var headLine = headVals.join(", ");
    rowVals = _.map(rowVals, row => {
      var newRow = _.map(row, r => {
        var str = JSON.stringify(r);
        str = str.replace(/"/gi, '');
        return '\\"' + str + '\\"';
      });
      return newRow.join(', ');
    });
    var rowsLine = rowVals.join("\n");

    return headLine + "\n" + rowsLine;
  }
});

module.exports = bookshelf;
