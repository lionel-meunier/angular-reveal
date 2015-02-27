/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  angular.module('angularRevealApp').factory(
    'RevealControls',
    [function () {

      function RevealControls(){
      }

      RevealControls.prototype.setParent = function(reveal){
        this.reveal = reveal;
        this.setIterableH(this.reveal.iterable);
      };
      RevealControls.prototype.setIterableH = function(iterable){
        this.iterableH = iterable;
        this.updateIterableV();
      };
      RevealControls.prototype.updateIterableV = function(){
        var current = this.iterableH.current();
        if(_.isObject(current)){
          if(current.hasSubSection()){
            this.setIterableV(current.iterable);
          } else {
            this.setIterableV();
          }
        }
      };
      RevealControls.prototype.setIterableV = function(iterable){
        this.iterableV = iterable;
      };

      RevealControls.prototype.getHIndex = function(){
        return this.iterableH.index;
      };

      RevealControls.prototype.getHSize = function(){
        return  this.iterableH.count();
      };

      RevealControls.prototype.getVIndex = function(){
        if(this.iterableV){
          return this.iterableV.index;
        }
        return null;
      };

      RevealControls.prototype.getVSize = function(){
        if(this.iterableV){
          return this.iterableV.count();
        }
        return null;
      };


      RevealControls.prototype.getClassForDirection = function(direction) {
        if(this.isEnabled(direction)){
          return 'enabled';
        }
      };

      RevealControls.prototype.isEnabled = function(direction) {
        var index,size;
        if(direction === 'left' || direction === 'right' ){
          index = this.getHIndex();
          if(direction === 'left'){
            if(index > 0){
              return true;
            }
          } else {
            size = this.getHSize();
            if(index + 1 < size){
              return true;
            }
          }
        } else if (direction === 'up' || direction === 'down'){
          index = this.getVIndex();
          if(direction === 'up'){
            if(index > 0){
              return true;
            }
          } else {
            size = this.getVSize();
            if(index + 1 < size){
              return true;
            }
          }
          return false;
        }
        return false;
      };

      RevealControls.prototype.left = function(){
        if(this.isEnabled('left')){
          this.iterableH.prev();
          this.updateIterableV();
        }
      };
      RevealControls.prototype.right = function(){
        if(this.isEnabled('right')){
          this.iterableH.next();
          this.updateIterableV();
        }
      };
      RevealControls.prototype.up = function(){
        if(this.isEnabled('up')){
          this.iterableV.prev();
        }
      };
      RevealControls.prototype.down = function(){
        if(this.isEnabled('down')){
          this.iterableV.next();
        }
      };
      RevealControls.prototype.next = function(){
        if(this.iterableV){
          if(this.iterableV.hasNext()){
            return this.iterableV.next();
          }
        }
        if(this.iterableH.hasNext()){
          return this.iterableH.next();
        }
        return;
      };
      RevealControls.prototype.prev = function(){
        console.log('prev not implemented');
      };
      RevealControls.prototype.first = function(){
        console.log('first not implemented');
      };
      RevealControls.prototype.last = function(){
        console.log('last not implemented');
      };


      return RevealControls;
    }]);
})();

