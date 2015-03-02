(function () {
  'use strict';

  describe('directives', function () {
    describe('reveal', function () {

      // load the directive's module
      beforeEach(module('angularRevealApp'));
      beforeEach(module('templates'));

      var element,
        $rootScope,
        $compile,
        scope;

      beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        scope = $rootScope.$new();
      }));

      var createDirective = function () {
        element = angular.element('<reveal></reveal>');
        element = $compile(element)(scope);
        scope.$digest();
      };

      var getCtrl = function () {
        createDirective();
        return element.controller('reveal');
      };

      it('should has progress and controls by default', function () {
        createDirective();
        expect(element.find('[reveal-progress]').length).toBe(1);
        expect(element.find('[reveal-controls]').length).toBe(1);
      });

      it('should controller has iterable element', function () {
        var ctrl = getCtrl();
        expect(_.isObject(ctrl.reveal.iterable)).toBe(true);
      });

    });
  });
})();
