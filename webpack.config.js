const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
      mode: 'development', // or 'production'
      entry: './src/index.ts',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
      },
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'public/assets/[name].[ext]',
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.js'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: '/src/index.html',
        }),
      ],
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        watchFiles: ['src/*.css', 'src/*.html'],
        compress: true,
        port: 8080,
      },
    };