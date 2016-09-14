/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var less = require('gulp-less');
var ts = require('gulp-typescript');
var uglify = require("gulp-uglify");
var cssMinify = require('gulp-minify-css-names');
var del = require('del');
var tsConfig = require('./wwroot/app/tsconfig.json');
var browserSync = require('browser-sync').create();

var paths = {
    root: "./wwwroot",
    libs: [
        'node_modules/@angular/**/*.js',
        'node_modules/angular2-in-memory-web-api/*.js',
        'node_modules/rxjs/**/*.js',
        'node_modules/systemjs/dist/*.js',
        'node_modules/zone.js/dist/*.js',
        'node_modules/core-js/client/*.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/jquery/dist/*.js',
        'node_modules/bootstrap/dist/**/*.*'
    ]
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


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: paths.root
        },
    })
})

gulp.task('restore', function () {
    return gulp.src(paths.libs)
    .pipe(gulp.dest(path.dest.libs));
});

gulp.task('clean-js', function () {
    del(paths.dest.js);
    del(paths.dest.jsMin);
    return;
});

gulp.task('clean-css', function () {
    del(paths.dest.css);
    del(paths.dest.cssMin);
    return;
});

gulp.task('compile-less', ['clean-css'], function () {
    return gulp.src(paths.src.less)
    .pipe(less())
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('compile-ts', ['clean-js'], function () {
    return gulp.src(paths.src.ts)
    .pipe(ts(tsConfig.compilerOptions))
    .js
    .pipe(gulp.dest(paths.dest.js))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task("min-js", ["compile-js"], function () {
    return gulp.src(paths.dest.js)
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(paths.dest.jsMin));
});

gulp.task("min-css", ["compile-less"], function () {
    return gulp.src(paths.dest.css)
        .pipe(cssMinify())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.dest.cssMin))
});

gulp.task('compile', ['compile-js', 'compile-css']);

gulp.task('min', ['min-js, min-css']);

gulp.task('clean', ['clean-js', 'clean-css']);

gulp.task('watch', ['browserSync', 'compile-less', 'compile-ts'], function () {
    gulp.watch(paths.src.less, ['compile-less']);
    gulp.watch(paths.src.ts, ['compile-ts']);
});


