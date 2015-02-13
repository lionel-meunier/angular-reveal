'use strict';

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:revealControl
 * @description
 * # revealControl
 */

function RevealControls(scope,element){
  this.scope = scope;
  this.element = element;
}

RevealControls.prototype.setReveal = function(reveal){
  this.reveal = reveal;
};

RevealControls.prototype.getIndexCurrent = function(){
  return this.reveal.current.index;
};

RevealControls.prototype.getSectionSize = function(){
  return  this.reveal.allSection.length;
};

RevealControls.prototype.getStackCurrent = function(){
  return this.reveal.current.stack;
};

RevealControls.prototype.getStackSize = function(){
  return this.reveal.current.section.stack.length;
};

RevealControls.prototype.initScope = function(){
  var self = this;
  this.scope.left = function(){
    self.left();
  };
  this.scope.right = function(){
    self.right();
  };
  this.scope.top = function(){
    self.top();
  };
  this.scope.bottom = function(){
    self.bottom();
  };
};

RevealControls.prototype.left = function(){
  var index = this.getIndexCurrent();
  if(index - 1 > 0){
    this.reveal.goToIndex(index-1);
  }
};
RevealControls.prototype.right = function(){
  var index = this.getIndexCurrent();
  var size = this.getSectionSize();
  if(index + 1 < size){
    this.reveal.goToIndex(index+1);
  }
};
RevealControls.prototype.top = function(){
  var stack = this.getStackCurrent();
  if(stack - 1 > 0){
    this.reveal.goToStack(stack-1);
  }
};
RevealControls.prototype.bottom = function(){
  var stack = this.getStackCurrent();
  var size = this.getStackSize();
  if(stack + 1 < size){
    this.reveal.goToStack(stack+1);
  }
};



angular.module('angularRevealApp')
  .controller('RevealControlsCtrl',['$scope','$element',function($scope,$element){
    this.controls = new RevealControls($scope,$element);
  }])
  .directive('revealControls', function () {
    return {
      restrict: 'EA',
      controller:'RevealControlsCtrl',
      replace: true,
      templateUrl: 'template/controls.html',
      require : ['revealControls','^reveal'],
      link: function postLink(scope, element, attrs, ctrl) {
        var revealControlsCtrl = ctrl[0];
        var revealCtrl = ctrl[1];
        revealControlsCtrl.controls.setReveal(revealCtrl.reveal);
        revealCtrl.reveal.addControls(revealControlsCtrl.controls);
      }
    };
  });
