const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    mode: "development",
    entry: './public/src/app/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'public/src/index.html'),
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
