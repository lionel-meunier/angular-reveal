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


      it('should direction left,right is not enabled if is empty', function () {
        spyOn(myService.iterableH,'next');
        spyOn(myService.iterableH,'prev');
        myService.right();
        expect(myService.iterableH.next).not.toHaveBeenCalled();
        myService.left();
        expect(myService.iterableH.prev).not.toHaveBeenCalled();
        expect(_.isUndefined(myService.iterableV)).toBe(true);
      });

      it('should direction left,right call function prev and next to iterable H', function () {
        addSection(revealService);
        addSection(revealService);
        spyOn(myService.iterableH,'next');
        spyOn(myService.iterableH,'prev');
        myService.right();
        expect(myService.iterableH.next).toHaveBeenCalled();
        myService.right();
        myService.iterableH.index = 1;
        myService.left();
        expect(myService.iterableH.prev).toHaveBeenCalled();
      });

      it('should direction right call function next to iterable H', function () {
        addSection(revealService);
        addSection(revealService);
        spyOn(myService.iterableH,'next');
        myService.right();
        expect(myService.iterableH.next).toHaveBeenCalled();
      });

      it('should direction right call function next to iterable H if is not last', function () {
        addSection(revealService);
        addSection(revealService);
        myService.iterableH.last();
        spyOn(myService.iterableH,'next');
        myService.right();
        expect(myService.iterableH.next).not.toHaveBeenCalled();
      });

      it('should direction left call function prev to iterable H', function () {
        addSection(revealService);
        addSection(revealService);
        myService.iterableH.last();
        spyOn(myService.iterableH,'prev');
        myService.left();
        expect(myService.iterableH.prev).toHaveBeenCalled();
      });

      it('should direction left call function prev to iterable H if is not first', function () {
        addSection(revealService);
        addSection(revealService);
        myService.iterableH.first();
        spyOn(myService.iterableH,'prev');
        myService.left();
        expect(myService.iterableH.prev).not.toHaveBeenCalled();
      });

      it('should direction right and left init iterable V', function () {
        addSection(revealService);
        addSection(revealService);
        spyOn(myService,'updateIterableV');
        myService.right();
        myService.left();
        expect(myService.updateIterableV.calls.count()).toBe(2);
      });

      it('should direction down call function next to iterable V', function () {
        addSection(revealService);
        addSection(revealService);
        var current = revealService.iterable.current();
        addSection(current);
        addSection(current);
        myService.updateIterableV();
        spyOn(myService.iterableV,'next');
        myService.down();
        expect(myService.iterableV.next).toHaveBeenCalled();
      });

      it('should direction down call function next to iterable V if is not last', function () {
        addSection(revealService);
        addSection(revealService);
        var current = revealService.iterable.current();
        addSection(current);
        addSection(current);
        myService.updateIterableV();
        myService.iterableV.last();
        spyOn(myService.iterableV,'next');
        myService.down();
        expect(myService.iterableV.next).not.toHaveBeenCalled();
      });

      it('should direction up call function prev to iterable V', function () {
        addSection(revealService);
        addSection(revealService);
        var current = revealService.iterable.current();
        addSection(current);
        addSection(current);
        myService.updateIterableV();
        myService.iterableV.last();
        spyOn(myService.iterableV,'prev');
        myService.up();
        expect(myService.iterableV.prev).toHaveBeenCalled();
      });

      it('should direction up call function prev to iterable V if is not first', function () {
        addSection(revealService);
        addSection(revealService);
        var current = revealService.iterable.current();
        addSection(current);
        addSection(current);
        myService.updateIterableV();
        myService.iterableV.first();
        spyOn(myService.iterableV,'prev');
        myService.up();
        expect(myService.iterableV.prev).not.toHaveBeenCalled();
      });

    });
  });
})();
