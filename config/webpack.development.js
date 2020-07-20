const parts = require('./webpack.parts');

const { merge } = require('webpack-merge');

// development
const developmentConfig = merge([
  parts.devServer({
    open: false,
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  parts.generateSourceMaps({ type: 'source-map' }),

  parts.webpackMessage(),

  parts.loadCSS(),
]);

module.exports = developmentConfig;
