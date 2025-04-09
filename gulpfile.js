const { series } = require('gulp');
const { exec, spawn, spawnSync } = require('child_process');
const { readdirSync, rmSync, copyFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const chalk = require('chalk');
const tsc = mocha = path.resolve(__dirname, './node_modules/typescript/bin/tsc');
const wp = mocha = path.resolve(__dirname, './node_modules/webpack/bin/webpack');

const paths = {
    out: './dist',
    assets: './assets',
    webpack: './build/',
    webpackEntry: './dist/grid.js',
    webpackName: 'ts-react-json-table.js'
};

function run(cmd, args, cb){
    console.log();

    const status =  spawnSync(cmd, args, {
        cwd: process.cwd(),
        env: process.env,
        stdio: [process.stdin, process.stdout, process.stderr],
        encoding: 'utf-8'
    }).status;

    if(status !== 0){
        throw Error(`Failed to execute command '${args.join()}'`);
    }
    else{
        cb();
    }
}

function execute(cmd, cb){

    exec(cmd, function (err, stdout, stderr) {
        if(err){
            console.log();
            console.log(chalk.red(stdout));
            throw err;
        }
        console.log(stdout);
        cb();
    });
}

function build(cb) {
    run('node', [tsc], cb);
}

function clean(cb) {
    if(!existsSync(paths.out)){
        mkdirSync(paths.out);
    }

    readdirSync(paths.out).forEach(f => rmSync(`${paths.out}/${f}`, {recursive: true}));
    readdirSync(paths.webpack).forEach(f => rmSync(`${paths.webpack}/${f}`, {recursive: true}));
    cb();
}

function webpack(cb){
    run('node',  [wp, '--config', './webpack.config.js'], cb);
}

function copy(cb) {
    //copyFileSync('./assets/ts-react-json-table.css', paths.webpack + 'ts-react-json-table.css');
    cb();
}

function pack(cb){
    execute('npm pack', cb);
}

exports.build = build;
exports.clean = clean;
exports.webpack = series(clean, build, webpack);

exports.pack = series(clean, build, webpack, copy, pack);
