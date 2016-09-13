/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var less = require('gulp-less');
var ts = require('gulp-typescript');
var uglify = require("gulp-uglify");
var cssMinify = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

var paths = {
    root: "./wwwroot"
};
paths.app = paths.root + "/app";
paths.src = {
    ts: paths.app + "/**/*/*.ts",
    less: paths.app + "/**/*/*.less"
};
path.dest = {
    js: paths.app + "/dest/js",
    jsMin: paths.app + "/dest/js/min",
    css: paths.app + "/dest/css",
    cssMin: paths.app + "/dest/css/min",
    libs: paths.root + "/libs"
}
paths.libs = [
        'node_modules/@angular/**/*.js',
        'node_modules/angular2-in-memory-web-api/*.js',
        'node_modules/rxjs/**/*.js',
        'node_modules/systemjs/dist/*.js',
        'node_modules/zone.js/dist/*.js',
        'node_modules/core-js/client/*.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/jquery/dist/*.js',
        'node_modules/bootstrap/dist/**/*.*'
];


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: paths.root
        },
    })
})

gulp.task('restore', function() {
    return gulp.src(paths.libs)
    .pipe(gulp.dest(path.dest.libs));
});

gulp.task('less', function () {
    return gulp.src(paths.src.less)
    .pipe(less())
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('ts', function () {
    return gulp.src(paths.src.ts)
    .pipe(ts())
    .js
    .pipe(gulp.dest(paths.dest.js))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task("js-min", function () {
    return gulp.src(paths.dest.js)
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(paths.dest.jsMin));
});

gulp.task("css-min", function () {
    return gulp.src(paths.dest.css)
        .pipe(cssMinify())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.dest.cssMin))
});

gulp.task('watch', ['browserSync', 'less', 'ts'], function () {
    gulp.watch(paths.src.less, ['less']);
    gulp.watch(paths.src.ts, ['ts']);
});


