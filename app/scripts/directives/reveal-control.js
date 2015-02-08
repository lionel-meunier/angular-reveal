'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:revealControl
 * @description
 * # revealControl
 */
angular.module('angularRevealApp')
  .directive('revealControls', function () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/controls.html',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
