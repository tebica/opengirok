var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.common');


config.plugins.push(new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
}));
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());
config.module.loaders = config.module.loaders.map(function(loader) {
    if (loader.loaders && loader.loaders.includes('style')) {
        delete loader.loaders;
        loader.loader = ExtractTextPlugin.extract('style', 'css!stylus')
    }
    return loader
});


module.exports = {
    context: config.context,
    entry: config.entry,
    output: {
        path: path.join(__dirname, 'public/build/'),
        filename: '[name].[ext]',
        publicPath: '/'
    },
    plugins: config.plugins,
    resolve: config.resolve,
    module: config.module
};
