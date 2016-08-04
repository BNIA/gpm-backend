var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

var srcDir = path.join(process.cwd(), 'public/app/**/*.less');
var destDir = path.join(process.cwd(), 'public/app');

gulp.task('compile-less', () => {
  return gulp.src(srcDir)
    .pipe(less({}))
    .pipe(gulp.dest(destDir));
});

gulp.task('watch-less', () => {
  gulp.watch([srcDir], ['compile-less']);
});
