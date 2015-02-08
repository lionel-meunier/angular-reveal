'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:reveal
 * @description
 * # reveal
 */
angular.module('angularRevealApp')
  .controller('RevealCtrl',['$scope','$window','$element',function($scope,$window,$element){
    function calZoom(){
      console.log('calcdu zoom');
      var rW = $element.width() / $element.find('.slides').width();
      var rH = $element.height() / $element.find('.slides').height();
      var zoom;
      if(rH > rW){
        zoom = rW;
      } else {
        zoom = rH;
      }
      $element.find('.slides').css('zoom',zoom);
    }

    function testZoom() {
      var slides = $element.find('.slides');
      if(slides.width() > $element.width() || slides.height() > $element.height()){
        calZoom();
      }
    }

    angular.element($window).on('resize',function(){
      testZoom();
    });
    testZoom();
  }])
  .directive('reveal', function () {
    return {
      restrict: 'EA',
      controller:'RevealCtrl',
      transclude: true,
      replace: true,
      templateUrl:'template/reveal.html',
      link: function (scope, element, attrs) {
        console.log(element.html());
      }
    };
  });
