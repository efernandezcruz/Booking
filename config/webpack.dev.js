const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    // When upgrading to webpack-dev-server ^4+ change contentBase to static
    static: paths.build,
    historyApiFallback: true,
    open: false,
    compress: true,
    port: 3000,
    hot: true,
    client: {
      overlay: false,
    },
  },

  module: {
    rules: [
      // ... other rules
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          // ... other loaders
          {
            loader: require.resolve('babel-loader'),
            options: {
              // ... other options
              plugins: [
                // ... other plugins
                require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                // To enable css modules for a file,
                // use the naming convention *.module.css
                auto: true,
                localIdentName: '[path][name]__[local]',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()].filter(Boolean),
});
