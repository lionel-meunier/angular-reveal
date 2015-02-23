'use strict';

describe('Directive: reveal', function () {

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

  var getReveal = function () {
    return getCtrl().reveal;
  };

  it('should has progress and controls by default', function () {
    createDirective();
    expect(element.find('[reveal-progress]').length).toBe(1);
    expect(element.find('[reveal-controls]').length).toBe(1);
  });

  it('should controller has function section', function () {
    var ctrl = getCtrl();
    expect(_.isFunction(ctrl.reveal.addSection)).toBe(true);
    expect(_.isFunction(ctrl.reveal.getSection)).toBe(true);
    expect(_.isFunction(ctrl.reveal.removeSection)).toBe(true);
  });


  it('should controller has function progress', function () {
    var ctrl = getCtrl();
    expect(_.isFunction(ctrl.reveal.addProgress)).toBe(true);
    expect(_.isFunction(ctrl.reveal.getProgress)).toBe(true);
    expect(_.isFunction(ctrl.reveal.removeProgress)).toBe(true);
  });

  it('should controller has array all section ', function () {
    var ctrl = getCtrl();
    expect(_.isObject(ctrl.reveal.iterable)).toBe(true);
  });

  describe('controls', function () {

    it('should controller has function controls', function () {
      var ctrl = getCtrl();
      expect(_.isFunction(ctrl.reveal.addControls)).toBe(true);
      expect(_.isFunction(ctrl.reveal.getControls)).toBe(true);
      expect(_.isFunction(ctrl.reveal.removeControls)).toBe(true);
    });

    it('should add controls inject object in controls', function () {
      var reveal = getReveal();
      var controls = {test:'test'};
      reveal.addControls(controls);
      expect(reveal.controls.test).toBe('test');
      var fn = function(){
        reveal.addControls();
      };
      expect(fn).toThrow();
    });
  });

});
