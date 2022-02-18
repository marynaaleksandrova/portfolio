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
          'dist/index.html': ['jade/index.jade'],
          'dist/cyclic.html': ['jade/cyclic.jade'],
          'dist/hashobject.html': ['jade/hashobject.jade'],
          'dist/goostame.html': ['jade/goostame.jade'],
          'dist/lifelines.html': ['jade/lifelines.jade'],
          'dist/ctfo.html': ['jade/ctfo.jade'],
          'dist/zectr-brand.html': ['jade/zectr-brand.jade'],
          'dist/zectr-io-redesign.html': ['jade/zectr-io-redesign.jade'],
          'dist/ux-workshop.html': ['jade/ux-workshop.jade'],
          'dist/data-viz.html': ['jade/data-viz.jade'],
          'dist/zectr-app.html': ['jade/zectr-app.jade'],
          'dist/zectr-sgen.html': ['jade/zectr-sgen.jade']
        }
      }
    },

    stylus: {
      compile: {
        options: {
          paths: ['styl'], // folder, where files to be imported are located
          urlfunc: 'url', // use embedurl('test.png') in our code to trigger Data URI embedding
          'include css': true
        },
        files: {
          'dist/index.css': 'styl/index.styl' // 1:1 compile
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/jquery.js', 'js/app.js'],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/app.js': ['dist/app.js']
        }
      }
    },

    watch: {
      src: {
        files: ['jade/*.jade', 'styl/*.styl', 'js/*.js'],
        tasks: ['build']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jade:compile', 'stylus:compile', 'concat:dist']);
  grunt.registerTask('deploy', ['jade:compile', 'stylus:compile', 'concat:dist', 'uglify:my_target']);

};