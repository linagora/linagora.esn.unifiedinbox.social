'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../../',
    files: [
      'frontend/components/chai/chai.js',
      'node_modules/chai-shallow-deep-equal/chai-shallow-deep-equal.js',
      'frontend/components/lodash/dist/lodash.js',
      'frontend/components/jquery/dist/jquery.js',
      'frontend/components/angular/angular.js',
      'frontend/components/angular-ui-router/release/angular-ui-router.js',
      'frontend/components/angular-mocks/angular-mocks.js',
      'frontend/components/angular-component/dist/angular-component.js',
      'frontend/components/dynamic-directive/dist/dynamic-directive.js',
      'frontend/components/sinon-chai/lib/sinon-chai.js',
      'node_modules/sinon/pkg/sinon.js',
      'frontend/components/moment/moment.js',
      'frontend/components/lodash/dist/lodash.js',
      'frontend/components/jmap-client/dist/jmap-client.js',
      'frontend/components/angular-moment/angular-moment.js',
      'frontend/components/angular-sanitize/angular-sanitize.js',
      'frontend/components/angular-material/modules/js/core/core.js',
      'frontend/components/angular-material/modules/js/showHide/showHide.js',
      'frontend/components/angular-material/modules/js/virtualRepeat/virtualRepeat.js',
      'frontend/components/angular-uuid4/angular-uuid4.js',
      'frontend/components/angular-feature-flags/dist/featureFlags.js',
      'frontend/components/re-tree/re-tree.js',
      'frontend/components/ng-device-detector/ng-device-detector.js',
      'frontend/components/restangular/dist/restangular.js',

      'node_modules/linagora-rse/test/fixtures/code-generation/constants.js',
      'node_modules/linagora-rse/frontend/js/modules/**/*.module.js',
      'node_modules/linagora-rse/frontend/js/modules/**/*.js',
      'node_modules/linagora-rse/frontend/js/**/*.pug',
      'node_modules/linagora-rse/frontend/views/modules/**/*.pug',
      'node_modules/linagora.esn.unifiedinbox/frontend/js/app.js',
      'node_modules/linagora.esn.unifiedinbox/frontend/js/**/*.js',
      'node_modules/linagora.esn.unifiedinbox/frontend/app/**/*.js',
      'node_modules/linagora.esn.unifiedinbox/frontend/**/*.pug',

      'test/unit-frontend/mocks/**/*.js',
      'frontend/app/**/*.js',
      'frontend/app/**/*.pug'
    ],
    exclude: [
      'node_modules/linagora-rse/frontend/js/**/*.spec.js',
      'node_modules/linagora.esn.unifiedinbox/frontend/app/**/*.spec.js'
    ],
    frameworks: ['mocha'],
    colors: true,
    singleRun: true,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox'],
    reporters: ['coverage', 'spec'],
    preprocessors: {
      'frontend/js/**/*.js': ['coverage'],
      '**/*.pug': ['ng-jade2module']
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-ng-jade2module-preprocessor'
    ],

    coverageReporter: {type: 'text', dir: '/tmp'},

    ngJade2ModulePreprocessor: {
      stripPrefix: 'frontend',
      cacheIdFromPath: function(filepath) {
        return filepath
          .replace(/pug$/, 'html')
          .replace(/^frontend/, '/unifiedinbox.ml')
          .replace(/^node_modules\/linagora.esn.unifiedinbox\/frontend/, '/unifiedinbox')
          .replace(/^node_modules\/linagora-rse\/frontend/, '');
      },
      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('templates')
      jadeRenderOptions: {
        basedir: require('path').resolve(__dirname, '../../node_modules/linagora-rse/frontend/views')
      },
      jadeRenderLocals: {
        __: function(str) {
          return str;
        }
      },
      moduleName: 'jadeTemplates'
    }

  });
};
