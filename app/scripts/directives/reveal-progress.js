'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:revealProgress
 * @description
 * # revealProgress
 */
angular.module('angularRevealApp')
  .directive('revealProgress', function () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/progress.html',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
