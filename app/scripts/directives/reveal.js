'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:reveal
 * @description
 * # reveal
 */
angular.module('angularRevealApp')
  .controller('RevealCtrl', ['$scope', '$window', '$element', 'Reveal',function ($scope, $window, $element, Reveal) {
    this.reveal = new Reveal($scope, $element);
    $scope.$reveal = this.reveal;
  }])
  .directive('reveal', function () {
    return {
      restrict: 'EA',
      controller: 'RevealCtrl',
      transclude: true,
      replace: true,
      templateUrl: 'template/reveal.html',
      scope: {}
    };
  });
