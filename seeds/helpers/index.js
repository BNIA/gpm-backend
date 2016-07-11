var csv = require('fast-csv');
var Promise = require('bluebird');
var _ = require('lodash');

// takes csv and outputs a promise for a list of objects
exports.readCsv = Promise.method((path, options) => {
  return new Promise((resolve, reject) => {
    var records = [];
    csv.fromPath(path, options)
      .on('data', record => {
        records.push(record);
      })
      .on('end', () => {
        var cols = records[0];
        var rows = _.tail(records);
        var objs = _.map(rows, r => {
          r = _.map(r, x => {
            if (x === "") {
              return null;
            }
            return x;
          });
          return _.zipObject(cols, r);
        });
        resolve(objs);
      });
  });
});
