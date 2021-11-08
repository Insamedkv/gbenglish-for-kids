const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => (!isDev ? {} : {
  devServer: {
    open: 'chrome',
    hot: true,
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
  },
});

const esLintPlugin = (isDev) => (isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })]);

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false,
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new CopyPlugin({
      patterns: [
        { from: './public' },
      ],
    }),

    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),

    ...esLintPlugin(develop),
  ],
  ...devServer(develop),
});
