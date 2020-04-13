const path = require('path');

module.exports = {
    mode: "development",
    entry: './public/src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
};
