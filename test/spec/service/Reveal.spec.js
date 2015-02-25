/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  describe('Service', function () {
    describe('Reveal', function () {

      beforeEach(module('angularRevealApp'));

      var Service,
        $rootScope;

      beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        Service = $injector.get('Reveal');
      }));

      it('init throw error if scope is not object and element is not jquery object', function () {
        var scope,element;
        var fn = {
          create : function(){
            new Service(scope,element);
          }
        };
        expect(fn.create).toThrowError('scope is not object');
        scope = {};
        expect(fn.create).toThrowError('element is not jQuery object');
        element = angular.element('<div></div>');
        expect(fn.create).not.toThrow();
      });

      describe('init', function () {
        var scope,
          element,
          myService;

        beforeEach(function () {
          scope = $rootScope.$new();
          element = angular.element('<div></div>');
          myService = new Service(scope,element);
        });

        it('create iterable with service RevealSectionIterable',function(){
          expect(myService.iterable.constructor.name).toBe('RevealSectionIterable');
        });
      });

      describe('controls', function () {
        var scope,
          element,
          myService,
          RevealControls;

        beforeEach(inject(function ($injector) {
          scope = $rootScope.$new();
          element = angular.element('<div></div>');
          myService = new Service(scope,element);
          RevealControls = $injector.get('RevealControls');
        }));

        it('add to throw if is not object RevealControls',function(){
          var controls;
          var fn = {
            add : function(){
              myService.addControls(controls);
            }
          };
          expect(fn.add).toThrowError('controls is not object');
          controls = {};
          expect(fn.add).toThrowError('controls has not method setParent');
          controls = new RevealControls();
          expect(fn.add).not.toThrow();
        });

        it('add init parents controls',function(){
          var controls = new RevealControls();
          spyOn(controls,'setParent');
          myService.addControls(controls);
          expect(controls.setParent).toHaveBeenCalledWith(myService);
        });

      });

      describe('zoom', function () {
        var scope,
          element,
          myService,
          $window;

        beforeEach(inject(function ($injector) {
          $window = $injector.get('$window');
        }));

        it('cal zoom to init if element slides',function(){
          scope = $rootScope.$new();
          element = angular.element('<div>' +
          '<div class="slides"></div>' +
          '</div>'
          );
          element.width(1200);
          element.height(1200);
          myService = new Service(scope,element);
          expect(_.isEmpty(element.find('.slides').css('zoom'))).toBe(false);
        });

        it('cal zoom after window resize',function(){
          scope = $rootScope.$new();
          element = angular.element('<div>' +
            '<div class="slides"></div>' +
            '</div>'
          );
          myService = new Service(scope,element);
          spyOn(myService,'calculationZoomSlides');
          var w = angular.element($window);
          w.trigger('resize');
          expect(myService.calculationZoomSlides).toHaveBeenCalled();
        });
      });

    });
  });
})();
