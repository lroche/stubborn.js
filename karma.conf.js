module.exports = function(config){
// Karma configuration

	config.set({
		// base path, that will be used to resolve files and exclude
		basePath : '.',
		
		// list of files / patterns to load in the browser
		files: [
			
			
			/* Dojo config: */
			"dojo-config.js",
			/* Dojo adapter for Karma@0.8.x*/
			"node_modules/karma-dojo/dojo-adapter.js",	
			/* dojo main file */
			"node_modules/dojo/dojo.js",
		
			"node_modules/sinon/pkg/sinon.js",
		
			//AMD dojo files
			{pattern: 'node_modules/dojo/**/*.js', included:false, served:true, watched:false},
			//src
			{pattern: 'stubborn.js', included: false, served:true, watched:true},
			//test files
			{pattern: 'test/**/*.js', included: false, served:true, watched:true},
			
			
		
		
		],

		frameworks: ['jasmine-bridge', 'jasmine'],

		//	Using star (*) as work-around to force resolution of pluginDirectory during inclusion
		plugins: [
		'karma-jasmin*',
		'karma-*-launcher'
		],

		// list of files to exclude
		exclude: [
			//'deps/dojo/tests/**/*.*',
			//'deps/dijit/tests/**/*.*'
		],
		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit'
		reporters: ['progress'],

		//junit reporter configuration
		junitReporter: 'junit',

		// web server port
		port: 9876,

		// cli runner port
		runnerPort: 9100,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_DEBUG,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,
	});

}
