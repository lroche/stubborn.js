module.exports = function(grunt) {
  var path = require("path");

  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
  banner:
        '/**  \n' +
        '* <%=pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\n' + 
        '*\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> Lionel Roche.\n' +
        '* Distributed under MIT license\n' +
        '*\n' + 
        '* https://github.com/lroche/<%=pkg.name%>\n' +
        '*/\n',
  jshint:{ src:"stubborn.js"},
 	concat: {
    options: {
      stripBanners:true,
      banner: "<%= banner %>"
    },
    dist: {
      src: ['<%= pkg.name %>'],
      dest: 'build/<%= pkg.name %>',
    },
  },
   uglify: {
      options: {
        banner: '<%= banner %>',
        preserveComments:'some'
      },
      build: {
        src: '<%= pkg.name %>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    compress : {
      main : {
          options : {
              archive : "dist/<%=pkg.name%>.zip"
          },
          files : [
              { expand: true, src : "**/*", cwd : "build/" }
          ]
        }
    },
    copy: {
       main: {
        expand: true,
        cwd: 'build/',
        src: '**',
        dest: 'dist/',
        flatten: true,
        filter: 'isFile',
      }
    }, 
    clean:{
      build:["build"],
      deps:["deps", "lib"],
      dist:["dist"]

    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome', 'Firefox']               
      },
      ci: {
        singleRun: true        
      },
      dev: {
        reporters: 'dots',
        
      }
    },
    bower:{
       options:{
          copy:false,
          verbose:true,         
        },
      install:{
       
      }
    }
  });
  
  //Load "grunt-" tasks from package.json
  require( "load-grunt-tasks" )( grunt );
  grunt.registerTask('dev', ['karma:dev']);
  grunt.registerTask('dist', ['clean', 'volo:add', 'karma:ci', 'concat', 'uglify', 'copy']);
  grunt.registerTask('default', 'dist');
};