const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack-stream');
const sequence = require('gulp4-run-sequence');
var ts = require('gulp-typescript');
const chalk = require('chalk');
const minify = require('gulp-minify');
const run = require('gulp-run');
const sourcemaps = require('gulp-sourcemaps');

let buildDone = false;

const paths = {
    src: ['src/*ts*', './ts-react-json-table.d.ts'],
    out: './dist',
    test: './dist/test/**/*.js',
    webpack: './build/',
    webpackEntry: './dist/grid.js',
    webpackName: 'ts-react-json-table.js'
};

let tsProject = ts.createProject('tsconfig.json');

function logBuildResult(){
    console.log(buildDone ? chalk.green('Build succeeded.') : chalk.red('Build failed.'));
}

gulp.task('build', function() {
    console.log(chalk.blue('Typescript compile.'));
    buildDone = true;
    return gulp.src(paths.src)
    .pipe(tsProject())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.out));
});

gulp.task('clean', function() {
    console.log(chalk.blue('Cleaning'));
    return del([paths.out + '/**/*', paths.webpack + '/**/*']);
});

gulp.task('clean_webpack', function() {
    console.log(chalk.blue('Cleaning webpack output in ' + paths.webpack));
    return del([paths.webpack + '/**/*']);
});

gulp.task('webpack', gulp.series('clean_webpack', 'build', function() {
    logBuildResult();
    if(!buildDone){ return;}
    console.log(chalk.blue('Creating webpack in', paths.webpack));
    return gulp.src(paths.webpackEntry)
      .pipe(webpack({
          output: {
              libraryTarget: 'umd',
              filename: paths.webpackName,
              library: 'JsonTable',
              //libraryExport: 'JsonTable',
          },
          externals: {
              react: {
                  commonjs: null,
                  commonjs2: null,
                  //amd: "React",
                  root: 'React'
              }
          },
          optimization: {
            minimize: false
          },
          devtool: "source-map"
    }))
    .pipe(gulp.dest(paths.webpack));
}));

gulp.task('minify', gulp.series('webpack', function() {
    return gulp.src(paths.webpack + paths.webpackName)
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest(paths.webpack))
}));

gulp.task('copy-css', function() {
    return gulp.src('./src/**/*.css').pipe(gulp.dest(paths.webpack))
});

gulp.task('publish_npm', function () {
    return run('npm publish').exec();
});

gulp.task('publish', function (cb) {
    sequence('clean', 'minify', 'copy-css', 'publish_pack', 'publish_npm', cb);
});

gulp.task('publish_pack', function () {
    return run('npm pack').exec();
});

gulp.task('pack', function (cb) {
    sequence('clean', 'minify', 'copy-css', 'publish_pack', cb);
});