const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingWebpackPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist/async-race'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!.git',
      ],
    }),
    new EslingWebpackPlugin({ extensions: 'ts' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/", to: "./public/" },
      ],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? {
      mode: "production",
    } : {
      mode: "development",
      devtool: "inline-source-map",
      devServer: {
        static: {
          directory: path.resolve(__dirname, "/dist/async-race"),
        },
        open: true,
        hot: true,
      },
    };
  return merge(baseConfig, envConfig);
};