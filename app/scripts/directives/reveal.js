'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:reveal
 * @description
 * # reveal
 */
angular.module('angularRevealApp')
  .controller('RevealCtrl',['$scope',function($scope){
    console.log('test');
  }])
  .directive('reveal', function () {
    return {
      restrict: 'EA',
      //controller:'RevealCtrl',
      transclude: true,
      replace: true,
      templateUrl:'template/reveal.html',
      link: function (scope, element, attrs) {
        console.log(element.html());
      }
    };
  });
