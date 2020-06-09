'use strict';

// add your constants here.
var path = require('path');

module.exports.FRONTEND_PATH = path.normalize(__dirname + '/../../frontend');
module.exports.FRONTEND_PATH_BUILD = path.normalize(__dirname + '/../../dist');
module.exports.CORE_FRONTEND_PATH = path.normalize(path.dirname(require.main.filename) + '/frontend');
