const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        "ts-react-json-table": './dist/grid.js',
        "ts-react-json-table.min": './dist/grid.js',
    },
    output: {
        libraryTarget: 'umd',
        filename: '[name].js',
        library: 'JsonTable',
        path: path.resolve(__dirname, 'build'),
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
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            }),
        ],
    },
    devtool: "source-map"
};