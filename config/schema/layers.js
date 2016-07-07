module.exports = {
  id: {type: 'increments', nullable: false, primary: true},
  category: {type: 'string', nullable: false},
  geometry: {type: 'geometry'}
};
