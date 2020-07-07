import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";


export default{
  debug:true,
  devtools: "source-map",
  noInfo:false,
  entry:{
    vendor: path.resolve(__dirname,"src/vendor"),
    main: path.resolve(__dirname,"src/index")
  },
  target:"web",
  output:{
    path: path.resolve(__dirname,"dist"),
    publicPath:"/",
    filename:"[name].js"
  },
  plugins:[
    // Use commonschunkplugin to create a separete bundle
    // for thrm to be cached easily
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),

    // creates html file that includes reference to bundled js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    // eliminate duplicate plugins
    new webpack.optimize.DedupePlugin(),

    // uglify the code
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test:/\.js$/, exclude: "/node_modules/", loaders:['babel']},
      {test:/\.css$/, loaders:['style','css']}
    ]
  }
}