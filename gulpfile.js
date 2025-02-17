const { series } = require('gulp');
const { spawnSync, exec } = require('child_process');
const { readdirSync, rmSync, copyFileSync } = require('fs');
const chalk = require('chalk');

const paths = {
    src: ['src/*ts*', './ts-react-json-table.d.ts'],
    out: './dist',
    test: './dist/test/**/*.js',
    webpack: './build/',
    webpackEntry: './dist/grid.js',
    webpackName: 'ts-react-json-table.js'
};

function run(cmd, onClose){

    exec(cmd, function (err, stdout, stderr) {
        if(err){
            console.log();
            console.log(chalk.red(stdout));
            throw err;
        }
        console.log(stdout);
        onClose();
    });
}

function build(cb) {
    run('tsc', cb)
}

function clean(cb) {
    readdirSync(paths.out).forEach(f => rmSync(`${paths.out}/${f}`, {recursive: true}));
    readdirSync(paths.webpack).forEach(f => rmSync(`${paths.webpack}/${f}`, {recursive: true}));
    cb();
}

function webpack(cb){
    run('webpack --config ./webpack.config.js', cb);
}

function copy(cb) {
    copyFileSync("./src/ts-react-json-table.css", paths.webpack + "ts-react-json-table.css");
    cb();
}

function pack(cb){
    run('npm pack', cb);
}

exports.build = build;
exports.clean = clean;
exports.webpack = series(clean, build, webpack);

exports.pack = series(clean, build, webpack, copy, pack);
