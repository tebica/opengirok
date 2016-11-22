var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.common');
var port = 8089;


// Object.keys(config.entry).forEach(function(key) {
    // config.entry[key].unshift('webpack/hot/only-dev-server');
    // config.entry[key].unshift('webpack-dev-server/client?http://0.0.0.0:' + port);
// });

// config.plugins.push(new webpack.HotModuleReplacementPlugin());
// config.plugins.push(new webpack.NoErrorsPlugin());

// config.module.loaders = config.module.loaders.map(function(loader) {
    // if (loader.loader === 'babel') {
    //     loader.query.presets.push('react-hmre');
    // }
    // return loader;
// });


module.exports = {
    port: port,
    devtool: 'eval',
    context: config.context,
    entry: config.entry,
    output: {
        path: path.join(__dirname, 'public/static/build/'),
        filename: '[name].js',
        publicPath: 'http://localhost:' + port + '/static/build/'
    },
    plugins: config.plugins,
    resolve: config.resolve,
    module: config.module
};
