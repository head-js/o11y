const gulp = require('gulp');
const header = require('gulp-header');
const pkg = require('./package.json');


gulp.task('default', function () {
  return gulp
    .src('./.dist/analytics-snippet.js')
    .pipe(header('/* ' + pkg.name + ' ' + pkg.version + ' */\n'))
    .pipe(gulp.dest('./.dist/'));
});
