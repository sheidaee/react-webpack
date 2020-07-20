const path = require('path');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./config/webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
};

const developmentConfig = require('./config/webpack.development');
const productionConfig = require('./config/webpack.production');

// common config
const commonConfig = merge([
  {
    entry: {
      app: './src/index.js',
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].[hash].js',
    },
    resolve: {
      extensions: ['.js'],
      '@components': './src/components',
      '@modules': './src/modules',
      '@utils': './src/utils',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
        template: './public/index.html',
        filename: './index.html',
      }),
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
  },
  parts.loadJavaScript({ include: PATHS.app }),
  parts.loadHtml(),
  parts.loadImages(),
]);

module.exports = (mode) => {
  console.log({ mode });
  if (mode === 'production') {
    const config = merge(commonConfig, productionConfig, { mode });
    console.log(config);
    return config;
  }

  console.log({ developmentConfig });
  return merge(commonConfig, developmentConfig, { mode });
};
