const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        server: ['./index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './build'),
    }
}

