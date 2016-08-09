var path = require('path');
var fs = require('fs');
var _ = require('lodash');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/vital_signs_sections.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  return knex('vital_signs_colors').del().then(() => {
    return data;
  }).then(rows => {
    return _.reduce(rows, (res, row) => {
      var name = row.name;
      var colors = _.omit(row, ['name']);
      _.forEach(colors, (val, key) => {
        var obj = {};
        obj.value = val;
        obj.vital_signs_section_name = name;
        if (key === 'color_1') {
          obj.break_number = 1;
        } else if (key === 'color_2') {
          obj.break_number = 2;
        } else if (key === 'color_3') {
          obj.break_number = 3;
        } else if (key === 'color_4') {
          obj.break_number = 4;
        } else if (key === 'color_5') {
          obj.break_number = 5;
        }
        res.push(obj);
      });
      return res;
    }, []);
  }).map(row => {
    return knex('vital_signs_sections')
      .select('id')
      .where({name: row.vital_signs_section_name})
      .then(section => section[0].id)
      .then(id => {
        row.vital_signs_section_id = id;
      }).return(row);
  }).map(row => {
    return knex('vital_signs_colors')
      .insert({
        vital_signs_section_id: row.vital_signs_section_id,
        break_number: row.break_number,
        value: row.value
      });
  });
};
