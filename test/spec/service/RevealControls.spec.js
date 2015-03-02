/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  describe('Service', function () {
    describe('RevealControls', function () {

      beforeEach(module('angularRevealApp'));

      var Service,
        myService,
        Reveal,
        RevealSection,
        revealService,
        scope,
        element,
        $rootScope;

      beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        Reveal = $injector.get('Reveal');
        RevealSection = $injector.get('RevealSection');
        Service = $injector.get('RevealControls');
        scope = $rootScope.$new();
        element = angular.element('<div></div>');
        revealService = new Reveal(scope,element);
        myService = new Service();
        revealService.addControls(myService);
      }));

      var addSection = function(parent){
        var sectionScope = $rootScope.$new();
        var sectionElement = angular.element('<div></div>');
        var section = new RevealSection(sectionScope,sectionElement,parent);
        parent.addSection(section);
      };

      describe('is enabled direction',function(){

        it('left if iterable Horizontal has prev',function(){
          var enabled = false;
          spyOn(myService.iterableH,'hasPrev').and.callFake(function(){
            return enabled;
          });
          expect(myService.isEnabled('left')).toBe(false);
          enabled = true;
          expect(myService.isEnabled('left')).toBe(true);
        });
        it('right if iterable Horizontal has next',function(){
          var enabled = false;
          spyOn(myService.iterableH,'hasNext').and.callFake(function(){
            return enabled;
          });
          expect(myService.isEnabled('right')).toBe(false);
          enabled = true;
          expect(myService.isEnabled('right')).toBe(true);
        });
        it('up if iterable Vertical has prev',function(){
          addSection(revealService);
          myService.updateIterableV();
          var enabled = false;
          spyOn(myService.iterableV,'hasPrev').and.callFake(function(){
            return enabled;
          });
          expect(myService.isEnabled('up')).toBe(false);
          enabled = true;
          expect(myService.isEnabled('up')).toBe(true);
        });
        it('down if iterable Vertical has next',function(){
          addSection(revealService);
          myService.updateIterableV();
          var enabled = false;
          spyOn(myService.iterableV,'hasNext').and.callFake(function(){
            return enabled;
          });
          expect(myService.isEnabled('down')).toBe(false);
          enabled = true;
          expect(myService.isEnabled('down')).toBe(true);
        });

        it('test nothing',function(){
          expect(myService.isEnabled('test')).toBe(false);
        });
      });

      describe('navigate to is not enabled direction',function(){

        it('all direction not update iterable and not call next',function(){
          spyOn(myService,'isEnabled').and.returnValue(false);
          spyOn(myService,'updateIterableV');
          myService.left();
          myService.right();
          myService.up();
          myService.down();
          expect(myService.isEnabled).toHaveBeenCalled();
          expect(myService.updateIterableV).not.toHaveBeenCalled();

        });

      });

      describe('get class',function(){

        it('enabled for all direction if is enabled',function(){
          var enabled = false;
          spyOn(myService,'isEnabled').and.callFake(function(){
            return enabled;
          });
          expect(myService.getClassForDirection('left')).toBeUndefined();
          expect(myService.getClassForDirection('right')).toBeUndefined();
          expect(myService.getClassForDirection('up')).toBeUndefined();
          expect(myService.getClassForDirection('down')).toBeUndefined();
          enabled = true;
          expect(myService.getClassForDirection('left')).toBe('enabled');
          expect(myService.getClassForDirection('right')).toBe('enabled');
          expect(myService.getClassForDirection('up')).toBe('enabled');
          expect(myService.getClassForDirection('down')).toBe('enabled');
        });
      });

      describe('navigate to',function(){

        it('right if is enabled direction use iterable Horizontal next and update iterable Vertical',function(){
          spyOn(myService,'isEnabled').and.returnValue(true);
          spyOn(myService,'updateIterableV');
          spyOn(myService.iterableH,'next');
          myService.right();
          expect(myService.isEnabled).toHaveBeenCalled();
          expect(myService.updateIterableV).toHaveBeenCalled();
          expect(myService.iterableH.next).toHaveBeenCalled();
        });

        it('left if is enabled direction use iterable Horizontal prev and update iterable Vertical',function(){
          spyOn(myService,'isEnabled').and.returnValue(true);
          spyOn(myService,'updateIterableV');
          spyOn(myService.iterableH,'prev');
          myService.left();
          expect(myService.isEnabled).toHaveBeenCalled();
          expect(myService.updateIterableV).toHaveBeenCalled();
          expect(myService.iterableH.prev).toHaveBeenCalled();
        });

        it('up if is enabled direction use iterable Vertical prev',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService,'isEnabled').and.returnValue(true);
          spyOn(myService.iterableV,'prev');
          myService.up();
          expect(myService.isEnabled).toHaveBeenCalled();
          expect(myService.iterableV.prev).toHaveBeenCalled();
        });

        it('down if is enabled direction use iterable Vertical next',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService,'isEnabled').and.returnValue(true);
          spyOn(myService.iterableV,'next');
          myService.down();
          expect(myService.isEnabled).toHaveBeenCalled();
          expect(myService.iterableV.next).toHaveBeenCalled();
        });
      });

      describe('go to',function(){

        it('next increment iterable Vertical if has next',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService.iterableV,'hasNext').and.returnValue(true);
          spyOn(myService.iterableV,'next');
          myService.next();
          expect(myService.iterableV.hasNext).toHaveBeenCalled();
          expect(myService.iterableV.next).toHaveBeenCalled();
        });

        it('next increment iterable Horizontal if iterable Vertical has not next',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService.iterableV,'hasNext').and.returnValue(false);
          spyOn(myService.iterableV,'next');
          spyOn(myService.iterableH,'next');
          myService.next();
          expect(myService.iterableV.hasNext).toHaveBeenCalled();
          expect(myService.iterableV.next).not.toHaveBeenCalled();
          expect(myService.iterableH.next).toHaveBeenCalled();
        });

        it('prev decrement iterable Vertical if has prev',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService.iterableV,'hasPrev').and.returnValue(true);
          spyOn(myService.iterableV,'prev');
          myService.prev();
          expect(myService.iterableV.hasPrev).toHaveBeenCalled();
          expect(myService.iterableV.prev).toHaveBeenCalled();
        });

        it('prev decrement iterable Horizontal if iterable Vertical has not prev',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService.iterableV,'hasPrev').and.returnValue(false);
          spyOn(myService.iterableV,'prev');
          spyOn(myService.iterableH,'prev');
          myService.prev();
          expect(myService.iterableV.hasPrev).toHaveBeenCalled();
          expect(myService.iterableV.prev).not.toHaveBeenCalled();
          expect(myService.iterableH.prev).toHaveBeenCalled();
        });

        it('first got to first iterable Horizontal, update iterable Vertical and go first iterable Vertical',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService.iterableH,'first');
          spyOn(myService,'updateIterableV');
          spyOn(myService.iterableV,'first');
          myService.first();
          expect(myService.iterableH.first).toHaveBeenCalled();
          expect(myService.updateIterableV).toHaveBeenCalled();
          expect(myService.iterableV.first).toHaveBeenCalled();
        });

        it('last got to last iterable Horizontal, update iterable Vertical and go last iterable Vertical',function(){
          addSection(revealService);
          myService.updateIterableV();
          spyOn(myService.iterableH,'last');
          spyOn(myService,'updateIterableV');
          spyOn(myService.iterableV,'last');
          myService.last();
          expect(myService.iterableH.last).toHaveBeenCalled();
          expect(myService.updateIterableV).toHaveBeenCalled();
          expect(myService.iterableV.last).toHaveBeenCalled();
        });

      });

    });
  });
})();
