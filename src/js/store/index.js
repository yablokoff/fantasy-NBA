const environment = process.env.NODE_ENV;

if (environment === 'production') {
  module.exports = require('./store.prod')
} else {
  module.exports = require('./store.dev')
}
