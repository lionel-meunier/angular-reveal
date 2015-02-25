'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:revealSection
 * @description
 * # revealSection
 */

angular.module('angularRevealApp')
  .controller('RevealSectionCtrl',['$scope','$element','RevealSection',function($scope,$element, RevealSection){
    this.createSection = function(reveal){
      this.revealSection = new RevealSection($scope,$element,reveal);
      reveal.addSection(this.revealSection);
    };
  }])
  .directive('revealSection', ['$timeout',function ($timeout) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl : 'template/section.html',
      controller:'RevealSectionCtrl',
      require: ['^reveal','reveal-section'],
      scope : {},
      link: function(scope, element, attrs, ctrl) {

        var revealCtrl = ctrl[0];
        var revealSectionCtrl = ctrl[1];
        var revealSectionParentCtrl =  element.parent().controller('reveal-section');
        if(_.isObject(revealSectionParentCtrl)){
          $timeout(function(){
            revealSectionCtrl.createSection(revealSectionParentCtrl.revealSection);
          });
        } else {
          revealSectionCtrl.createSection(revealCtrl.reveal);
        }
      }
    };
  }]);
