// Karma configuration

module.exports = function karmaConfig(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'phantomjs-shim'],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.kmocha.js*'
    ],


    // list of files to exclude
    exclude: [
      '**/flycheck_*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.kmocha.js*': ['webpack']
    },

    quiet: true,

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            // need to babelify joi, joi-date-extensions, isemail, hoek, and topo's lib
            test: /[\\\/]node_modules[\\\/](joi[\\\/]lib[\\\/]|joi-date-extensions[\\\/]lib[\\\/]|isemail[\\\/]lib[\\\/]|hoek[\\\/]lib[\\\/]|topo[\\\/]lib[\\\/])/,
            loader: 'babel'
          },
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
          { test: /\.json$/, loader: 'json-loader' }
        ]
      },
      // most of the time we don't want this bloat
      node: {
        crypto: 'empty',
        net: 'empty',
        dns: 'empty'
      },
      resolve: {
        extensions: ['', '.json', '.js']
      }
    },

    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
