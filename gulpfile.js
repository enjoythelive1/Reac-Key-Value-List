const gulp = require('gulp');
const ts = require("gulp-typescript");
const Server = require('karma').Server;
const tslint = require("gulp-tslint");
const del = require("del");
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

gulp.task("build", ['clean'], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(distFolder));
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