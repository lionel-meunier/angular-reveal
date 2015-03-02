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
        scope = $rootScope.$new();
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

      describe('keyboards', function () {
        var scope,
          element,
          myService,
          $window,
          RevealControls,
          controls,
          window;

        beforeEach(inject(function ($injector) {
          $window = $injector.get('$window');
          RevealControls = $injector.get('RevealControls');
          controls = new RevealControls();
          scope = $rootScope.$new();
          element = angular.element('<div>' +
            '<div reveal-control></div>' +
            '</div>'
          );
          myService = new Service(scope,element);
          myService.addControls(controls);
          window = angular.element($window);
        }));

        var triggerWindowKeyDown = function (keyCode) {
          var e = jQuery.Event('keydown');
          e.keyCode = keyCode;
          window.trigger(e);
          $rootScope.$digest();
        };

        it('on keydown \'32\' or \'78\' call controls next',function(){
          spyOn(myService.controls,'next');
          triggerWindowKeyDown(32);
          expect(myService.controls.next).toHaveBeenCalled();
          triggerWindowKeyDown(78);
          expect(myService.controls.next.calls.count()).toBe(2);
        });

        it('on keydown \'80\' call controls prev',function(){
          spyOn(myService.controls,'prev');
          triggerWindowKeyDown(80);
          expect(myService.controls.prev).toHaveBeenCalled();
        });

        it('on keydown \'37\' or \'72\' call controls left',function(){
          spyOn(myService.controls,'left');
          triggerWindowKeyDown(37);
          expect(myService.controls.left).toHaveBeenCalled();
          triggerWindowKeyDown(72);
          expect(myService.controls.left.calls.count()).toBe(2);
        });

        it('on keydown \'38\' or \'75\' call controls up',function(){
          spyOn(myService.controls,'up');
          triggerWindowKeyDown(38);
          expect(myService.controls.up).toHaveBeenCalled();
          triggerWindowKeyDown(75);
          expect(myService.controls.up.calls.count()).toBe(2);
        });

        it('on keydown \'39\' or \'76\' call controls right',function(){
          spyOn(myService.controls,'right');
          triggerWindowKeyDown(39);
          expect(myService.controls.right).toHaveBeenCalled();
          triggerWindowKeyDown(76);
          expect(myService.controls.right.calls.count()).toBe(2);
        });

        it('on keydown \'40\' or \'74\' call controls down',function(){
          spyOn(myService.controls,'down');
          triggerWindowKeyDown(40);
          expect(myService.controls.down).toHaveBeenCalled();
          triggerWindowKeyDown(74);
          expect(myService.controls.down.calls.count()).toBe(2);
        });

        it('on keydown \'36\' call controls first',function(){
          spyOn(myService.controls,'first');
          triggerWindowKeyDown(36);
          expect(myService.controls.first).toHaveBeenCalled();
        });

        it('on keydown \'35\' call controls last',function(){
          spyOn(myService.controls,'last');
          triggerWindowKeyDown(35);
          expect(myService.controls.last).toHaveBeenCalled();
        });

      });

    });
  });
})();
