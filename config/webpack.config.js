const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            'window.SQL': 'sql.js/js/sql.js'
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    optimization: {
        minimize: false
    }
};