const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/lib/index.ts',
    styles: './styles/main.less'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          'less-loader'
        ]
      },
      {
        test: /\.ya?ml$/,
        use: "yaml-loader",
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new IgnoreEmitPlugin(['styles.js']),
  ],
  devServer: {
    static: './docs',
    client: {
      overlay: false,
      logging: 'none'
    },
    open: true
  },
  mode: 'development'
};
