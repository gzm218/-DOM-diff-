//https://webpack.js.org/
const path = require('path');

module.exports = {
  //入口
  entry: './src/index.js',
  output: {
    //虚拟打包路径,就是说文件不会真正的生成，而是在8080端口虚拟生成
    publicPath: 'xuni',
    //打包出的文件名
    filename: 'bundle.js',
  },
  devServer: {
    //端口号
    port: 8080,
    //静态资源文件夹
    contentBase: 'www',
  },
};
