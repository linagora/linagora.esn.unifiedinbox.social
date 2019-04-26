(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.social').config(config);

  function config($stateProvider) {
    $stateProvider.state('unifiedinbox.configuration.socialnetworks', {
      url: '/socialnetworks',
      views: {
        'configuration@unifiedinbox.configuration': {
          template: '<inbox-configuration-social-networks />'
        }
      }
    });
  }
})(angular);
