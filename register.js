process.env.NODE_PATH = 'src:' + process.env.NODE_PATH;
require('module').Module._initPaths();
require('ts-node/register');
