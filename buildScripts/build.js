/* eslint-disable no-console */
const webpack = require("webpack");
const { default: webpackConfigProd } = require("../webpack.config.prod");
const chalk = require('chalk')

process.env.NODE_ENV = 'production'

console.log(chalk.green('Generating minified bundle for production. This will take a moment ...'))

webpack(webpackConfigProd).run((err, stats) =>{
  if (err){
    console.log(chalk.red(err))
    return 1
  }
  
  const jsonStats = stats.toJson()
  
  if(jsonStats.hasErrors){
    return jsonStats.errors.map(error => console.log(chalk.red(error)))
  }

  if (jsonStats.hasWarnings){
    console.log(chalk.yellow('Webpack generated the following warning(s): '))
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)))
  }

  console.log(`Webpack Stats: ${stats}`)

  console.log(chalk.green('Your app has been built for production and written to /dist'))

  return 0

})