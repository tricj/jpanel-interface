var gulp    = require('gulp');
var sass    = require('gulp-sass');
var server  = require('./bin/JPI');

gulp.task('sass', ()=>{
    gulp.src('./public/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
});

gulp.task('default', ()=>{
   gulp.watch('./public/sass/**/*.scss', ['sass']);
   server;
});