const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer')
const notify = require('gulp-notify')
//const browserSync = require('browser-sync').create()
//const connect = require('gulp-connect');

const paths = {
    scss: './src/public/scss/*.sass'
}

gulp.task('sass', () => {
    gulp.src('./src/public/scss/template.sass')
        .pipe(sass({
            includePaths: ['sass']
        }))
        .pipe(gulp.dest('./src/public/css'))
})

gulp.task('minify-css', () => {
  return gulp.src(['./src/public/css/template.css', './src/public/css/animate.css'])
    .pipe(cleanCSS({
        compatibility: 'ie8',
        restructuring: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/public/css'));
});

gulp.task('watch', ['sass'], () => {
    gulp.watch(['./src/public/scss/*.sass'], ['sass'])
})
