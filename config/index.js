module.exports = {
  env: process.env.NODE_ENV || 'development',
  connectionOptions: require('./connection-options'),
  paths: require('./paths')
};
