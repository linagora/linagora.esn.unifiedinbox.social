(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.social')
    .controller('inboxSidebarSocialNetworksController', inboxSidebarSocialNetworksController);

  function inboxSidebarSocialNetworksController(dynamicDirectiveService) {
    var self = this;

    self.$onInit = $onInit;
    self.hasSidebarSocialNetworksGotInjections = hasSidebarSocialNetworksGotInjections;

    /////

    function $onInit() {
      self.hasSidebarSocialNetworks = self.hasSidebarSocialNetworksGotInjections();
    }

    function hasSidebarSocialNetworksGotInjections() {
      return dynamicDirectiveService.getInjections('inbox-sidebar-social-networks-item', {}).length > 0;
    }
  }
})(angular);
