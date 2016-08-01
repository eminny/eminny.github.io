'use strict';

const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const compass = require('gulp-compass');
const concat = require('gulp-concat');
const csslint = require('gulp-csslint');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const path = require('path');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const minifyCSS = require('gulp-minify-css');
const minifyHTML = require('gulp-minify-html');

gulp.task('browserSync', function () {
    return browserSync.init({
        "proxy": "canderparis.dev",
        "port": 8080
    });
});

gulp.task('copy-fonts', function () {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(notify({message: 'Fonts copied.'}))
        .pipe(browserSync.stream());
});

gulp.task('copy-html', function () {
    return gulp.src('src/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('build'))
        .pipe(notify({message: 'HTML copied.'}))
        .pipe(browserSync.stream());
});

gulp.task('copy-images', function () {
  return gulp.src('src/images/**/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/images'))
      .pipe(notify({message: 'Images copied.'}))
      .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    // PostCSS processors
    const processors = [
        autoprefixer(['> 3% in US'])
    ];

    const paths = {
        sass: 'src/scss',
        targetCSS: 'build/css',
        targetImg: 'build/images'
    };

    return gulp.src(paths.sass + "/**/*.scss")
        .pipe(compass({
            css: paths.targetCSS,
            sass: paths.sass,
            image: paths.targetImg,
            require: ['breakpoint', 'susy', 'modular-scale']
        }))
        .pipe(notify({message: 'Stylesheets compiled.'}))
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.targetCSS))
        .pipe(rename({
            basename: 'main',
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.targetCSS)).on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(notify({message: 'Stylesheets compiled.'}))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src([
        'src/js/**/*.js',
        '!src/js/**/*.min.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(notify({message: 'Scripts compiled.'}))
    .pipe(browserSync.stream());
});

gulp.task('copy-vendor-scripts', function () {
    return gulp.src('src/js/vendor/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(notify({message: 'Vendor scripts copied.'}))
        .pipe(browserSync.stream());
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/images/**/*.*', ['copy-images']);
    gulp.watch('src/js/vendor/*.js', ['copy-vendor-scripts']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});

// Build a minified, production-ready site to build folder
gulp.task('build', [
    'copy-fonts',
    'copy-html',
    'copy-images',
    'copy-vendor-scripts',
    'sass',
    'scripts'
]);

// Default Task
gulp.task('default', [
    'build',
    'browserSync',
    'watch'
]);