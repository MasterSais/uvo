module.exports = (
  process.env.NODE_ENV === 'production'
    ? require('./dist/cjs/index.min.js')
    : require('./dist/cjs/index.js')
)