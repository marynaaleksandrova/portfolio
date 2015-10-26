module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // aws: grunt.file.readJSON('grunt-aws.json'), // for S3

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'dist/index.html': ['jade/index.jade']
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

    // s3: {
    //   key: '<%= aws.key %>',
    //   secret: '<%= aws.secret %>',
    //   bucket: '<%= aws.bucket %>',
    //   access: 'public-read',

    //   // Files to be uploaded.
    //   upload: [
    //     {
    //       src: 'dist/index.html',
    //       dest: 'index.html',
    //       gzip: true
    //     },
    //     {
    //       src: 'dist/index.css',
    //       dest: 'index.css',
    //       gzip: true
    //     },
    //     {
    //       src: 'dist/robots.txt',
    //       dest: 'robots.txt'
    //     },
    //     {
    //       src: 'dist/app.js',
    //       dest: 'app.js',
    //       gzip: true
    //     }
    //   ]
    // },

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
  // grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jade:compile', 'stylus:compile', 'concat:dist']);
  grunt.registerTask('deploy', ['jade:compile', 'stylus:compile', 'concat:dist', 'uglify:my_target', 's3:upload']);

};