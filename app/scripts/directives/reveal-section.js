'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:revealSection
 * @description
 * # revealSection
 */

function RevealSection(scope,element){
  this.scope = scope;
  this.element = element;
  this.initScope();
}

RevealSection.prototype.initScope = function(){
  var self = this;
  this.scope.getClassByState = function(){
    return self.getClassByState();
  }
};

RevealSection.prototype.hasSubSection = function(){
  return false;
};

RevealSection.prototype.getIndex = function(){
  var self = this;
  if(this.hasSubSection()) {
    console.error('hasSubSection getIndex not implemented');
  } else {
    var slides = this.element.parent('.slides');
    var index = -1;
    _.each(slides.find('.section'),function(el,ite){
      if(el === self.element.get(0)) {
        index = ite;
      }
    });
    return index;
  }
  return 0;
};

RevealSection.prototype.setState = function(state){
  this.state = state;
};

RevealSection.prototype.getClassByState = function() {
  if(this.state === 'current'){
    return 'present'
  } else if(this.state === 'prev'){
    return 'past'
  } else if(this.state === 'next'){
    return 'futur'
  }
  return '';
};

angular.module('angularRevealApp')
  .controller('RevealSectionCtrl',['$scope','$element',function($scope,$element){
    var revealSection = new RevealSection($scope,$element);
    this.revealSection = revealSection;
  }])
  .directive('revealSection', function () {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl : 'template/section.html',
      controller:'RevealSectionCtrl',
      require: ['^reveal','reveal-section'],
      scope : {},
      link: function postLink(scope, element, attrs, ctrl) {

        var revealCtrl = ctrl[0];
        var revealSectionCtrl = ctrl[1];
        var revealSectionParentCtrl =  element.parent().controller('reveal-section');
        if(_.isObject(revealSectionParentCtrl)){
          console.log(revealSectionParentCtrl,revealSectionCtrl.revealSection);
        } else {
          revealCtrl.reveal.addSection(revealSectionCtrl.revealSection);
        }
        //
      }
    };
  });
