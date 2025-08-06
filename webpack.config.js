const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 把整个目录copy过去
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const ESLintPlugin = require('eslint-webpack-plugin')

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
  devServer: {
    port: '8088'
  },
  // 指定入口文件
  entry: './src/index.tsx',
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的文件
    filename: 'bundle.js',
    libraryTarget: 'umd',
    // 告诉webpack不使用箭头
    // 默认打包后是一个立即执行的箭头函数，在IE 11中也是无法执行的！
    // 加上下面的配置，可以在webpack打包时，最外层不再是箭头函数
    // webpack新版本已经不想兼容IE了！233
    environment: {
      arrowFunction: false,
    },
  },
  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // 处理ts和tsx文件
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '58',
                      ie: '11',
                    },
                    corejs: '3',
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        exclude: /node-modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  // 配置Webpack插件
  plugins: [
    // new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    // 把整个目录copy过去
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, './static') }],
    }),

    new ESLintPlugin({
      context: './src', // 检查目录
      extensions: ['js', 'jsx', 'ts', 'tsx'], // 文件扩展
    }),
  ],
  // 用来设置引用模块
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // 包太大会提示你
  performance: {
    hints: false,
  },
}
