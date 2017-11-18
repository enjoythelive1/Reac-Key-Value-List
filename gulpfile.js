const gulp = require('gulp');
const ts = require("gulp-typescript");
const Server = require('karma').Server;
const tslint = require("gulp-tslint");
const tsProject = ts.createProject("tsconfig.json");

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

gulp.task("build", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("lint", function () {
    return tsProject.src()
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("default", ["lint", "test", "build"]);