'use strict';

/**
 * @ngdoc function
 * @name angularRevealApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularRevealApp
 */
angular.module('angularRevealApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
