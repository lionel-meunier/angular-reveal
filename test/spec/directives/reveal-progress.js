'use strict';

describe('Directive: revealProgress', function () {

  // load the directive's module
  beforeEach(module('angularRevealApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reveal-progress></reveal-progress>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the revealProgress directive');
  }));
});
