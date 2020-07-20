const parts = require('./webpack.parts');
const { merge } = require('webpack-merge');

const productionConfig = merge([
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.extractCSS({
    use: ['css-loader', parts.autoPrefix(), 'less-loader'],
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),
]);

module.exports = productionConfig;
