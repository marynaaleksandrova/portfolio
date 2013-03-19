module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "dist/index.html": ["jade/index.jade"]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');

};