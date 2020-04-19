const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    mode: "development",
    entry: './public/app/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/public'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
};
