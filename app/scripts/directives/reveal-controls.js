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
  this.initScope();
  this.initElement();
}

RevealControls.prototype.setIterable = function(reveal){
  this.iterable = reveal;
};

RevealControls.prototype.getIndexCurrent = function(){
  return this.iterable.index;
};

RevealControls.prototype.getSectionSize = function(){
  return  this.iterable.count() - 1;
};

RevealControls.prototype.getStackCurrent = function(){
  if(this.iterable.current()){
    if(this.iterable.current().hasSubSection()){
      return this.iterable.current().iterable.index;
    }
  }
  return null;
};

RevealControls.prototype.getStackSize = function(){
  if(this.iterable.current()) {
    if (this.iterable.current().hasSubSection()) {
      return this.iterable.current().iterable.count();
    }
  }
  return null;
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
  this.scope.getClassForDirection = function(direction){
    return self.getClassForDirection(direction);
  };
};
RevealControls.prototype.getClassForDirection = function(direction) {
  if(this.isEnabled(direction)){
    return 'enabled';
  }
};

RevealControls.prototype.isEnabled = function(direction) {
  if(direction === 'left' || direction === 'right' ){
    var index = this.getIndexCurrent();
    if(direction === 'left'){
      if(index > 0){
        return true;
      }
    } else {
      var size = this.getSectionSize();
      if(index + 1 <= size){
        return true;
      }
    }
  } else if (direction === 'top' || direction === 'bottom'){
    return false;
  }
  return false;
};

RevealControls.prototype.initElement = function() {
  this.element.show();
};

RevealControls.prototype.left = function(){
  if(this.isEnabled('left')){
    var index = this.getIndexCurrent();
    this.iterable.prev();
  }
};
RevealControls.prototype.right = function(){
  if(this.isEnabled('right')){
    this.iterable.next();
  }
};
RevealControls.prototype.top = function(){
  if(this.isEnabled('top')){
    var stack = this.getStackCurrent();
    this.reveal.goToStack(stack-1);
  }
};
RevealControls.prototype.bottom = function(){
  if(this.isEnabled('bottom')){
    var stack = this.getStackCurrent();
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
      scope:{},
      link: function postLink(scope, element, attrs, ctrl) {
        var revealControlsCtrl = ctrl[0];
        var revealCtrl = ctrl[1];
        revealControlsCtrl.controls.setIterable(revealCtrl.reveal.iterable);
        revealCtrl.reveal.addControls(revealControlsCtrl.controls);
      }
    };
  });
