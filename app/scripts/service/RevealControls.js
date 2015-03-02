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
          this.setIterableV(current.iterable);
        }
      };
      RevealControls.prototype.setIterableV = function(iterable){
        this.iterableV = iterable;
      };


      RevealControls.prototype.getClassForDirection = function(direction) {
        if(this.isEnabled(direction)){
          return 'enabled';
        }
      };

      RevealControls.prototype.isEnabled = function(direction) {
        if(direction === 'left') {
          return this.iterableH.hasPrev();
        }
        if(direction === 'right') {
          return this.iterableH.hasNext();
        }
        if(direction === 'up') {
          if(this.iterableV) {
            return this.iterableV.hasPrev();
          }
        }
        if(direction === 'down') {
          if(this.iterableV) {
            return this.iterableV.hasNext();
          }
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
        return this.iterableH.next();
      };

      RevealControls.prototype.prev = function(){
        if(this.iterableV){
          if(this.iterableV.hasPrev()){
            return this.iterableV.prev();
          }
        }
        return this.iterableH.prev();
      };

      RevealControls.prototype.first = function(){
        this.iterableH.first();
        this.updateIterableV();
        if(this.iterableV){
          this.iterableV.first();
        }
      };
      RevealControls.prototype.last = function(){
        this.iterableH.last();
        this.updateIterableV();
        if(this.iterableV){
          this.iterableV.last();
        }
      };


      return RevealControls;
    }]);
})();

