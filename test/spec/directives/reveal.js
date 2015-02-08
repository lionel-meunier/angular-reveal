'use strict';

describe('Directive: reveal', function () {

  // load the directive's module
  beforeEach(module('angularRevealApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reveal></reveal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the reveal directive');
  }));
});
