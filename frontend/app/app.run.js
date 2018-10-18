(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.social')
    .run(run);

  function run(
    dynamicDirectiveService,
    inboxFilters,
    PROVIDER_TYPES
  ) {
    var inboxSidebarSocialNetworks = new dynamicDirectiveService.DynamicDirective(true, 'inbox-sidebar-social-networks', {});
    dynamicDirectiveService.addInjection('inbox-sidebar-social-networks', inboxSidebarSocialNetworks);

    inboxFilters.add([{
      id: 'isSocial',
      displayName: 'Social',
      type: PROVIDER_TYPES.SOCIAL,
      isGlobal: true
    }]);
  }
})(angular);
