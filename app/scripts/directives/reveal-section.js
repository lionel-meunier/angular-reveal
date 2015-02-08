'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:revealSection
 * @description
 * # revealSection
 */
angular.module('angularRevealApp')
  .directive('revealSection', function () {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl : 'template/section.html',
      require: '^reveal',
      link: function postLink(scope, element, attrs, ctrl) {
        console.log('rajouter la section');
      }
    };
  });
