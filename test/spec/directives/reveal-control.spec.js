(function () {
  'use strict';

  describe('directives', function () {
    describe('revealControl', function () {

      // load the directive's module
      beforeEach(module('angularRevealApp'));
      beforeEach(module('templates'));

      var $rootScope,
        $compile,
        scope;

      beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        scope = $rootScope.$new();
      }));

    });
  });
})();
