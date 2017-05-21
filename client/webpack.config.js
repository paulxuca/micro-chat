const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        microchat: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'microchat'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['es2015', {modules: false, loose: true}]],
                            plugins: [['inferno', {imports: true}]]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    {'loader': 'style-loader'},
                    {'loader': 'css-loader'}
                ]
            }
        ]
    },
    devServer: {
        publicPath: '/build',
        port: 3001
    }
};