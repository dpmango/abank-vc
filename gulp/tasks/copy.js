var gulp   = require('gulp');
var config = require('../config');

gulp.task('copy:video', function() {
  return gulp
    .src(config.src.video + '/*.*')
    .pipe(gulp.dest(config.dest.video));
});

gulp.task('copy', [
  'copy:video',
]);

gulp.task('copy:watch', function() {
  gulp.watch(config.src.video + '/*.*', ['copy:video']);
});
