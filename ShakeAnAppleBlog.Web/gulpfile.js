/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

var browserSync = require('browser-sync').create();
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('restore', function() {
    gulp.src([
        'node_modules/@angular/**/*.js',
        'node_modules/angular2-in-memory-web-api/*.js',
        'node_modules/rxjs/**/*.js',
        'node_modules/systemjs/dist/*.js',
        'node_modules/zone.js/dist/*.js',
        'node_modules/core-js/client/*.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/jquery/dist/*.js',
        'node_modules/bootstrap/dist/**/*.*'
    ]).pipe(gulp.dest('./wwwroot/libs'));
});

var less = require('gulp-less');
var stylesSrc = './wwwroot/app/less/*.less';
gulp.task('less', function () {
    return gulp.src(stylesSrc)
    .pipe(less())
    .pipe(gulp.dest('./wwwroot/app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

var ts = require('gulp-typescript');
var scriptsSrc = './wwwroot/app/ts/*.ts';
gulp.task('ts', function () {
    return gulp.src(scriptsSrc)
    .pipe(ts())
    .pipe(gulp.dest('./wwwroot/app/js'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('watch', ['browserSync', 'less', 'ts'], function () {
    gulp.watch(stylesSrc, ['less']);
    gulp.watch(scriptsSrc, ['ts']);
});


