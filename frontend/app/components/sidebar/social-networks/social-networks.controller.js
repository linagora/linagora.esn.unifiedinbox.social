(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.social')
    .controller('inboxSidebarSocialNetworksController', inboxSidebarSocialNetworksController);

  function inboxSidebarSocialNetworksController(dynamicDirectiveService, accountService, SUPPORTED_ACCOUNT_TYPES) {
    var self = this;

    self.$onInit = $onInit;
    self.hasSidebarSocialNetworksGotInjections = hasSidebarSocialNetworksGotInjections;

    /////

    function $onInit() {
      self.hasSidebarSocialNetworksGotInjections();
    }

    function hasSidebarSocialNetworksGotInjections() {
      return accountService.getAccountProviders().then(function(resp) {
        var providers = _.intersection(resp.data, _.values(SUPPORTED_ACCOUNT_TYPES));

        if (providers && providers.length > 0 && dynamicDirectiveService.getInjections('inbox-sidebar-social-networks-item', {}).length > 0) {
          self.hasSidebarSocialNetworks = true;
        }
      })
    }
  }
})(angular);
