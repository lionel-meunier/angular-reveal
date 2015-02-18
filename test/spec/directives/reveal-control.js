'use strict';

fdescribe('Directive: revealControl', function () {

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

  var getCtrlReveal = function () {
    return element.controller('reveal');
  };

  var getCtrl = function () {
    return element.find('.controls').controller('reveal-controls');
  };

  it('should ctrl has function left,right,top,bottom', function () {
    createDirective();
    var ctrl = getCtrl();
    expect(_.isObject(ctrl.controls)).toBe(true);
    expect(_.isFunction(ctrl.controls.left)).toBe(true);
    expect(_.isFunction(ctrl.controls.right)).toBe(true);
    expect(_.isFunction(ctrl.controls.top)).toBe(true);
    expect(_.isFunction(ctrl.controls.bottom)).toBe(true);
  });

  it('should function left,right call function goToIndex to revealCtrl', function () {
    createDirective();
    var revealCtrl = getCtrlReveal();
    var ctrl = getCtrl();
    var index = 2, size=2;
    spyOn(ctrl.controls,'getIndexCurrent').and.callFake(function(){
      return index;
    });
    spyOn(ctrl.controls,'getSectionSize').and.callFake(function(){
      return size;
    });
    spyOn(revealCtrl.reveal,'goToIndex');
    ctrl.controls.left();
    expect(ctrl.controls.getIndexCurrent).toHaveBeenCalled();
    expect(ctrl.controls.getSectionSize).not.toHaveBeenCalled();
    expect(revealCtrl.reveal.goToIndex).toHaveBeenCalledWith(1);
    index = 1;
    revealCtrl.reveal.goToIndex.calls.reset();
    ctrl.controls.left();
    expect(ctrl.controls.getIndexCurrent).toHaveBeenCalled();
    expect(ctrl.controls.getSectionSize).not.toHaveBeenCalled();
    expect(revealCtrl.reveal.goToIndex).not.toHaveBeenCalled();
    revealCtrl.reveal.goToIndex.calls.reset();
    ctrl.controls.right();
    expect(ctrl.controls.getIndexCurrent).toHaveBeenCalled();
    expect(ctrl.controls.getSectionSize).toHaveBeenCalled();
    expect(revealCtrl.reveal.goToIndex).toHaveBeenCalledWith(2);
    index = 2;
    revealCtrl.reveal.goToIndex.calls.reset();
    ctrl.controls.right();
    expect(ctrl.controls.getIndexCurrent).toHaveBeenCalled();
    expect(ctrl.controls.getSectionSize).toHaveBeenCalled();
    expect(revealCtrl.reveal.goToIndex).not.toHaveBeenCalled();
  });


});
