const gulp = require('gulp');
const ts = require("gulp-typescript");
const Server = require('karma').Server;
const tslint = require("gulp-tslint");
const del = require("del");
const sass = require('gulp-sass');
const tsProject = ts.createProject("tsconfig.json");

const distFolder = "dist";

gulp.task('test', function () {
    return new Promise(function (resolve, reject) {
        new Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, function (exitcode) {
            if (exitcode) {
                return reject(new Error(`Exit code:  ${exitcode}`));
            } else {
                return resolve();
            }
        }).start();
    });
});

gulp.task('only-test', ['test'], function () {
    process.exit();
});

gulp.task("typescript", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(distFolder));
});

gulp.task("style", function () {
    return gulp.src(['./lib/**/*.scss', './lib/**/*.sass'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task("build", ["clean"], function () {
    return gulp.run("typescript", "style");
});

gulp.task('clean', function () {
    return del([distFolder]);
});

gulp.task("lint", function () {
    return tsProject.src()
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("default", ["lint", "test", "build"]);