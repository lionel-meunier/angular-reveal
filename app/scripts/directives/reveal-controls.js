'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:revealControl
 * @description
 * # revealControl
 */





angular.module('angularRevealApp')
  .controller('RevealControlsCtrl',['$scope','$element','RevealControls',function($scope,$element,RevealControls){
    this.controls = new RevealControls();
    $scope.controls = this.controls;
  }])
  .directive('revealControls', function () {
    return {
      restrict: 'EA',
      controller:'RevealControlsCtrl',
      replace: true,
      templateUrl: 'template/controls.html',
      require : ['revealControls','^reveal'],
      scope:{},
      link: function postLink(scope, element, attrs, ctrl) {
        var revealControlsCtrl = ctrl[0];
        var revealCtrl = ctrl[1];
        revealCtrl.reveal.addControls(revealControlsCtrl.controls);
      }
    };
  });
