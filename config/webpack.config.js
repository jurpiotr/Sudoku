const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: {
      index: './src/index.js'
   },
   output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../', 'dist')
   },
   devServer: {
      contentBase: path.resolve(__dirname, '../', 'public')
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.(sass|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },
         {
            test: /\.(jpg|jpeg|png|gif|svg)$/,
            use: 'file-loader'
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Sudoku',
         template: './src/templates/index.html'
      }),
      new CleanWebpackPlugin()
   ]
};
