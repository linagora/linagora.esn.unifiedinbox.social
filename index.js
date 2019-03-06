const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const path = require('path');
const glob = require('glob-all');
const FRONTEND_JS_PATH = __dirname + '/frontend/app/';
const AWESOME_MODULE_NAME = 'linagora.esn.unifiedinbox.social';

const awesomeModule = new AwesomeModule(AWESOME_MODULE_NAME, {
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
    lib: function(dependencies, callback) {
      const moduleLib = require('./backend/lib')(dependencies);

      const lib = {
        lib: moduleLib
      };

      return callback(null, lib);
    },

    deploy: function(dependencies, callback) {
      // Register the webapp
      const app = require('./backend/webserver/application')(dependencies, this);
      const webserverWrapper = dependencies('webserver-wrapper');

      // Register every exposed frontend scripts
      const frontendJsFilesFullPath = glob.sync([
        FRONTEND_JS_PATH + '**/*.module.js',
        FRONTEND_JS_PATH + '**/!(*spec).js'
      ]);
      const frontendJsFilesUri = frontendJsFilesFullPath.map(function(filepath) {
        return filepath.replace(FRONTEND_JS_PATH, '');
      });
      const lessFile = path.join(FRONTEND_JS_PATH, 'app.less');

      webserverWrapper.injectAngularAppModules(AWESOME_MODULE_NAME, frontendJsFilesUri, AWESOME_MODULE_NAME, ['esn'], {
        localJsFiles: frontendJsFilesFullPath
      });
      webserverWrapper.injectLess(AWESOME_MODULE_NAME, [lessFile], 'esn');

      webserverWrapper.addApp(AWESOME_MODULE_NAME, app);

      return callback();
    }
  }
});


/**
 * The main AwesomeModule describing the application.
 * @type {AwesomeModule}
 */
module.exports = awesomeModule;
