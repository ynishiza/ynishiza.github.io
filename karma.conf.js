// Karma configuration
// Generated on Thu Sep 22 2022 10:49:11 GMT+0900 (Japan Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
			{ pattern: './node_modules/chai/chai.js' },
			{ pattern: 'test/*.test.js', type: 'module' },
			{ pattern: './data/gol/2022/common.js', include: false, type: 'module' },
			{ pattern: './data/gol/2022/GolUI.js', include: false, type: 'module' },
			{ pattern: './data/gol/2022/gol.js', include: false, type: 'module' },
			{ pattern: './data/gol/2022/GolRunner.js', include: false, type: 'module' },
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'results',
      outputFile: 'report.xml'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
