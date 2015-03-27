/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  describe('Service', function () {
    describe('RevealSection', function () {

      beforeEach(module('angularRevealApp'));

      var Service,
        Reveal,
        $rootScope;

      beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        Reveal = $injector.get('Reveal');
        Service = $injector.get('RevealSection');
      }));

      it('init throw error if scope is not object and element is not jquery object', function () {
        var scope,element,reveal;
        var fn = {
          create : function(){
            new Service(scope,element,reveal);
          }
        };
        expect(fn.create).toThrowError('scope is not object');
        scope = {};
        expect(fn.create).toThrowError('element is not jQuery object');
        element = angular.element('<div></div>');
        expect(fn.create).toThrowError('parent is not object');
        reveal = {};
        expect(fn.create).not.toThrow();
      });

      describe('initialized', function () {

        var myService,
          sectionElement,
          revealElement,
          revealService;

        beforeEach(inject(function ($injector) {
          $rootScope = $injector.get('$rootScope');
          Reveal = $injector.get('Reveal');
          Service = $injector.get('RevealSection');
          var scope = $rootScope.$new();
          revealElement = angular.element('<div></div>');
          revealService = new Reveal(scope,revealElement);
          var sectionScope = $rootScope.$new();
          sectionElement = angular.element('<div></div>');
          myService = new Service(sectionScope,sectionElement,revealService);
        }));

        it('hasSubSection if iterable is not empty', function () {
          var nbr = 0;
          spyOn(myService.iterable,'count').and.callFake(function(){
            return nbr;
          });
          expect(myService.hasSubSection()).toBe(false);
          expect(myService.iterable.count).toHaveBeenCalled();
          myService.iterable.count.calls.reset();
          nbr=1;
          expect(myService.hasSubSection()).toBe(true);
          expect(myService.iterable.count).toHaveBeenCalled();
        });

      });



    });
  });
})();
