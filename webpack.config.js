const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = () => {

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: './src/main/index.js',
      pets: './src/pets/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
    resolve: {
      extensions: ['.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        }, {
          test: /\.(svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
        },
      ],
    },
    devServer: {
      static: './src/',
      port: 8080,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/main/index.html',
        chunks: ['main'],
        filename: 'main/index.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/pets/index.html',
        chunks: ['pets'],
        filename: 'pets/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[hash].css',
      }),
      new CssMinimizerPlugin(),
    ],
  };
};