const WebpackMessages = require('webpack-messages');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// web pack dev server
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: false,
    overlay: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        secure: false,
      },
      '/avatars': {
        target: 'https://api.adorable.io',
        changeOrigin: true,
      },
    },
  },
});

exports.webpackMessage = () => ({
  plugins: [
    new WebpackMessages({
      name: 'client',
      logger: (str) => console.log(`>> ${str}`),
    }),
  ],
});

// load javascript
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

// load html
exports.loadHtml = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,
        use: 'html-loader',
      },
    ],
  },
});

// prefix css
exports.autoPrefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()],
  },
});

// css loader
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        // styleLoader(cssLoader(input))
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        loader: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ], // compiles Less to CSS
      },
    ],
  },
});

//source map
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

// extract css to file
exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash:4].css',
  });

  return {
    module: {
      rules: [
        // {
        //   test: /\.css$/,
        //   include,
        //   exclude,

        //   use: [
        //     MiniCssExtractPlugin.loader,
        //   ].concat(use),
        // },
        {
          test: /\.less$/,
          include,
          exclude,
          use: [MiniCssExtractPlugin.loader].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};

// load images
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|JPG|jpeg|png|gif|svg)$/gi,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options,
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
              },
            },
          },
        ],
      },
    ],
  },
});
