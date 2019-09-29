require('./register');

const serverConfig = require('build/configs/server/webpack.config').default;
const clientConfig = require('build/configs/client/webpack.config').default;

module.exports = [serverConfig, clientConfig];
