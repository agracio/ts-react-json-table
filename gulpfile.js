const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack-stream');
const sequence = require('run-sequence');
const tsb = require('gulp-tsb');
const chalk = require('chalk');
const minify = require('gulp-minify');
const run = require('gulp-run');

let buildDone = false;

const paths = {
    src: ['src/**', 'test/**', './*.ts', 'node_modules/@types/**/*.d.ts'],
    out: './dist',
    test: './dist/test/**/*.js',
    webpack: './build/',
    webpackEntry: './dist/grid.js',
    webpackName: 'ts-react-json-table.js'
};

function handleBuildError (error) {
    console.log(chalk.red(error.toString()));
    buildDone = false;
}

function createCompilation(){
    return tsb.create('tsconfig.json', false, null, function(error){handleBuildError(error)});
    //return tsb.create(tsconfig.compilerOptions, false, null, function(error){handleBuildError(error)});
}

function logBuildResult(){
    console.log(buildDone ? chalk.green('Build succeeded.') : chalk.red('Build failed.'));
}

gulp.task('build', function() {
    console.log(chalk.blue('Typescript compile.'));
    buildDone = true;
    return gulp.src(paths.src, {base: '.'})
        .pipe(createCompilation()())
        // .pipe(compilation())
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

gulp.task('webpack', ['clean_webpack', 'build'], function() {
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
          module: {
              rules: [
                  {test: /\.js$/, loader: "source-map-loader"}
              ],
          },
          externals: {
              react: {
                  commonjs: null,
                  commonjs2: null,
                  //amd: "React",
                  root: 'React'
              }
          },
          devtool: "#source-map"
    }))
    .pipe(gulp.dest(paths.webpack));
});

gulp.task('minify',['webpack'], function() {
    gulp.src(paths.webpack + paths.webpackName)
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest(paths.webpack))
});

gulp.task('copy-css', function() {
    return gulp.src('./src/**/*.css').pipe(gulp.dest(paths.webpack))
});

gulp.task('publish_npm', function () {
    return run('npm publish').exec();
});

gulp.task('publish', function () {
    sequence('clean', 'minify','copy-css', 'publish_pack', 'publish_npm');
});

gulp.task('publish_pack', function () {
    return run('npm pack').exec();
});

gulp.task('pack', function () {
    sequence('clean', 'minify', 'copy-css', 'publish_pack');
});