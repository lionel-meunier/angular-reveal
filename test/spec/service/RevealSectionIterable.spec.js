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

      describe('controls position in iterable', function () {
        var myService;

        beforeEach(function () {
          myService = new Service();
        });


        it('count return size iterable',function(){
          myService.sections = [{},{}];
          expect(myService.count()).toBe(2);
        });

        it('isFirst return true if current index = 0',function(){
          myService.index = 0;
          expect(myService.isFirst()).toBe(true);
          myService.index = 1;
          expect(myService.isFirst()).toBe(false);
        });

        it('isLast return true if current index = size iterable - 1',function(){
          myService.sections = [{},{}];
          myService.index = 1;
          expect(myService.isLast()).toBe(true);
          myService.index = 0;
          expect(myService.isLast()).toBe(false);
        });

        it('hasNext return is not last ',function(){
          var isLast = false;
          spyOn(myService,'isLast').and.callFake(function(){
            return isLast;
          });
          expect(myService.hasNext()).toBe(true);
          isLast = true;
          expect(myService.hasNext()).toBe(false);
        });

        it('hasPrev return is not first',function(){
          var isFirst = false;
          spyOn(myService,'isFirst').and.callFake(function(){
            return isFirst;
          });
          expect(myService.hasPrev()).toBe(true);
          isFirst = true;
          expect(myService.hasPrev()).toBe(false);
        });


      });
      describe('update iterable', function () {
        var myService;

        beforeEach(function () {
          myService = new Service();
        });

        it('add section push in sections sort sections with function getIndex in section and update current state', function () {
          var section1 = window.revealSectionMock.createFakeSection(1);
          var section2 = window.revealSectionMock.createFakeSection(0);
          var sizeDeb = myService.count();
          spyOn(myService, 'updateState');
          myService.addSection(section1);
          myService.addSection(section2);
          expect(myService.count()).toBe(sizeDeb + 2);
          expect(myService.updateState.calls.count()).toBe(2);
          expect(_.first(myService.sections)).toBe(section2);
        });

        it('remove section remove section sort sections and update state', function () {
          var section1 = window.revealSectionMock.createFakeSection(1);
          var section2 = window.revealSectionMock.createFakeSection(0);
          myService.addSection(section1);
          myService.addSection(section2);
          var sizeDeb = myService.count();
          spyOn(myService, 'updateState');
          myService.removeSection(section2);
          expect(myService.count()).toBe(sizeDeb -1);
          expect(myService.updateState).toHaveBeenCalled();
          expect(_.contains(myService.sections,section2)).toBe(false);
        });

        it('remove section current', function () {
          var section1 = window.revealSectionMock.createFakeSection(1);
          var section2 = window.revealSectionMock.createFakeSection(0);
          myService.addSection(section1);
          myService.addSection(section2);
          myService.next();
          spyOn(myService, 'hasPrev').and.returnValue(true);
          spyOn(myService, 'prev');
          var debCurrent = myService.current();
          myService.removeSection(myService.current());
          expect(myService.hasPrev).toHaveBeenCalled();
          expect(myService.prev).toHaveBeenCalled();
          expect(_.contains(myService.sections,debCurrent)).toBe(false);
        });

        it('update state clean all state add state current for current next for next and prev for prev', function () {
          var section1 = window.revealSectionMock.createFakeSection(1);
          var section2 = window.revealSectionMock.createFakeSection(2);
          var section3 = window.revealSectionMock.createFakeSection(3);
          var section4 = window.revealSectionMock.createFakeSection(4);
          var section5 = window.revealSectionMock.createFakeSection(5);
          var section6 = window.revealSectionMock.createFakeSection(6);
          myService.addSection(section1);
          myService.addSection(section2);
          myService.addSection(section3);
          myService.addSection(section4);
          myService.addSection(section5);
          myService.addSection(section6);
          myService.first();
          myService.next();
          myService.next();
          spyOn(section1,'setState');
          spyOn(section2,'setState');
          spyOn(section3,'setState');
          spyOn(section4,'setState');
          spyOn(section5,'setState');
          spyOn(section6,'setState');
          myService.updateState();
          expect(section1.setState).toHaveBeenCalledWith();
          expect(section2.setState).toHaveBeenCalledWith();
          expect(section3.setState).toHaveBeenCalledWith();
          expect(section4.setState).toHaveBeenCalledWith();
          expect(section5.setState).toHaveBeenCalledWith();
          expect(section6.setState).toHaveBeenCalledWith();
          expect(section2.setState.calls.count()).toBe(2);
          expect(section2.setState.calls.argsFor(1)).toEqual(['prev']);
          expect(section3.setState.calls.count()).toBe(2);
          expect(section3.setState.calls.argsFor(1)).toEqual(['current']);
          expect(section4.setState.calls.count()).toBe(2);
          expect(section4.setState.calls.argsFor(1)).toEqual(['next']);

        });
      });

      describe('change position in iterable', function () {
        var myService;

        beforeEach(function () {
          myService = new Service();
        });

        it('current return element with index', function () {
          var section1 = window.revealSectionMock.createFakeSection(0);
          myService.addSection(section1);
          var result = myService.current();
          expect(result).toBe(myService.sections[myService.index]);
        });

        it('current return undefined is not element', function () {
          var result = myService.current();
          expect(result).toBeUndefined();
        });

        it('next increment index ,return section current and update state current if has next', function () {
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          var indexDeb = myService.index;
          spyOn(myService, 'updateState');
          spyOn(myService, 'hasNext').and.returnValue(true);
          var result = myService.next();
          expect(myService.hasNext).toHaveBeenCalled();
          expect(myService.index).toBe(indexDeb + 1);
          expect(result).toBe(myService.current());
          expect(myService.updateState).toHaveBeenCalled();
        });

        it('next return undefined element not increment index, not update state if has not next',function(){
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          var indexDeb = myService.index;
          spyOn(myService, 'updateState');
          spyOn(myService, 'hasNext').and.returnValue(false);
          var result = myService.next();
          expect(myService.hasNext).toHaveBeenCalled();
          expect(myService.index).toBe(indexDeb);
          expect(result).toBeUndefined();
          expect(myService.updateState).not.toHaveBeenCalled();
        });

        it('prev decrement index ,return section current and update state current if has prev', function () {
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          myService.index=1;
          var indexDeb = myService.index;
          spyOn(myService, 'updateState');
          spyOn(myService, 'hasPrev').and.returnValue(true);
          var result = myService.prev();
          expect(myService.hasPrev).toHaveBeenCalled();
          expect(myService.index).toBe(indexDeb - 1);
          expect(result).toBe(myService.current());
          expect(myService.updateState).toHaveBeenCalled();
        });

        it('prev return undefined element not decrement index, not update state if has not prev',function(){
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          var indexDeb = myService.index;
          spyOn(myService, 'updateState');
          spyOn(myService, 'hasPrev').and.returnValue(false);
          var result = myService.prev();
          expect(myService.hasPrev).toHaveBeenCalled();
          expect(myService.index).toBe(indexDeb);
          expect(result).toBeUndefined();
          expect(myService.updateState).not.toHaveBeenCalled();
        });

        it('first return first element, reset index and update state if is not first',function(){
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          myService.next();
          spyOn(myService, 'updateState');
          spyOn(myService, 'isFirst').and.returnValue(false);
          var result = myService.first();
          expect(myService.isFirst).toHaveBeenCalled();
          expect(myService.index).toBe(0);
          expect(result).toBe(_.first(myService.sections));
          expect(myService.updateState).toHaveBeenCalled();
        });

        it('first return undefined , not change index and not update state if is first',function(){
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          myService.index = 3;
          spyOn(myService, 'updateState');
          spyOn(myService, 'isFirst').and.returnValue(true);
          var result = myService.first();
          expect(myService.isFirst).toHaveBeenCalled();
          expect(myService.index).toBe(3);
          expect(result).toBeUndefined();
          expect(myService.updateState).not.toHaveBeenCalled();
        });

        it('last return last element, return last index and update state if is not last',function(){
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          spyOn(myService, 'updateState');
          spyOn(myService, 'isLast').and.returnValue(false);
          var result = myService.last();
          expect(myService.isLast).toHaveBeenCalled();
          expect(myService.index).toBe(myService.count()-1);
          expect(result).toBe(_.last(myService.sections));
          expect(myService.updateState).toHaveBeenCalled();
        });

        it('last return undefined , not change index and not update state if is last',function(){
          var section1 = window.revealSectionMock.createFakeSection(0);
          var section2 = window.revealSectionMock.createFakeSection(1);
          myService.addSection(section1);
          myService.addSection(section2);
          myService.index = 3;
          spyOn(myService, 'updateState');
          spyOn(myService, 'isLast').and.returnValue(true);
          var result = myService.last();
          expect(myService.isLast).toHaveBeenCalled();
          expect(myService.index).toBe(3);
          expect(result).toBeUndefined();
          expect(myService.updateState).not.toHaveBeenCalled();
        });

      });



    });
  });
})();
