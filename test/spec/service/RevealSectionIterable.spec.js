/**
 * Created by lmeunier on 24/02/15.
 */
/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  describe('Service', function () {
    describe('RevealSectionIterable', function () {

      beforeEach(module('angularRevealApp'));

      var Service,
        $rootScope,
        RevealSection;

      beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        RevealSection = $injector.get('RevealSection');
        Service = $injector.get('RevealSectionIterable');
      }));

      it('init create index and array for collection', function () {
        var revealIte = new Service();
        expect(revealIte.index).toBe(0);
        expect(_.isArray(revealIte.sections)).toBe(true);
        expect(_.size(revealIte.sections)).toBe(0);
      });

      describe('init', function () {
        var myService;

        beforeEach(function () {
          myService = new Service();
        });


      });

    });
  });
})();
