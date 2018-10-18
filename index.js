const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const glob = require('glob-all');
const path = require('path');
const _ = require('lodash');

const NAME = 'unifiedinbox.social';
const APP_ENTRY_POINT = 'app.js';
const MODULE_NAME = 'linagora.esn.unifiedinbox.social';
const FRONTEND_JS_PATH = __dirname + '/frontend/app/';

const awesomeModule = new AwesomeModule(MODULE_NAME, {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.esn-config', 'esn-config'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.i18n', 'i18n'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.logger', 'logger'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.unifiedinbox', 'inbox'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.account', 'account'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.authorization', 'authorizationMW')
  ],

  states: {
    deploy: function(dependencies, callback) {
      const webserverWrapper = dependencies('webserver-wrapper');
      const app = require('./backend/webserver')(this, dependencies);
      let frontendModules = glob.sync([
        FRONTEND_JS_PATH + '**/!(*spec).js'
      ]).map(filepath => filepath.replace(FRONTEND_JS_PATH, ''));

      _.pull(frontendModules, APP_ENTRY_POINT);
      frontendModules = [APP_ENTRY_POINT].concat(frontendModules);

      webserverWrapper.injectAngularAppModules(NAME, frontendModules, MODULE_NAME, ['esn']);

      const lessFile = path.join(FRONTEND_JS_PATH, 'app.less');
      webserverWrapper.injectLess(MODULE_NAME, [lessFile], 'esn');

      webserverWrapper.addApp(NAME, app);

      require('./backend/lib/config')(dependencies).register();

      return callback();
    },

    start: (dependencies, callback) => callback()
  }
});

/**
 * The main AwesomeModule describing the application.
 * @type {AwesomeModule}
 */
module.exports = awesomeModule;
