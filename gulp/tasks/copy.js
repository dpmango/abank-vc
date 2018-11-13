var gulp   = require('gulp');
var config = require('../config');

gulp.task('copy:video', function() {
  return gulp
    .src(config.src.video + '/*.*')
    .pipe(gulp.dest(config.dest.video));
});

gulp.task('copy:root', function(){
    return gulp
      .src(config.src.root + "/*.*")
      .pipe(gulp.dest(config.dest.root))
})

gulp.task('copy', [
  'copy:root',
  'copy:video',
]);

gulp.task('copy:watch', function() {
  gulp.watch(config.src.root + '/*.*', ['copy:root']);
  gulp.watch(config.src.video + '/*.*', ['copy:video']);
});
