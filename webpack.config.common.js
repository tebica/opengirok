var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        'commons': 'commons',
        'index': 'index'
    },
    resolve: {
        extensions: ['', 'styl', '.jsx', '.js'],
        modulesDirectories: ['node_modules', 'src']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            },
            exclude: 'node_modules'
        }, {
            test: /\.json$/,
            loaders: ['json']
        }, {
            test: /\.styl$/,
            // loaders: ['style', 'css', 'stylus']
            loader: ExtractTextPlugin.extract('style', 'css!stylus')
        }, {
            test: /\.(png|jpg|svg)$/,
            loaders: ['url-loader?limit=1000&name=images/[name].[ext]?[hash]']
        }]
    },
    stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};
