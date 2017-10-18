require('./check-versions')()

const argv = require('yargs').argv
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const merge = require('webpack-merge')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = process.env.NODE_ENV === 'production'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')


const spinner = ora(`building for ${process.env.NODE_ENV}...`)
spinner.start()

rm(path.join(config.build.assetsRoot, '**/*.*'), err => {
  if (err) throw err
  webpack(
    merge(
      webpackConfig,
      { watch: argv.watch }
    ),
    (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    }
  )
})
