var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var path = require('path');

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  
  gulp.src('./src/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));

  gulp.src('./src/*/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('less', function () {
  gulp.src('./src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('build', ['jade', 'less'], function() {
  // Do stuff
});