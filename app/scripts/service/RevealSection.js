/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  angular.module('angularRevealApp').factory(
    'RevealSection',
    ['RevealSectionIterable',
      function (RevealSectionIterable) {

      function RevealSection(scope,element,parent){
        if (!_.isObject(scope)) {
          throw new Error('scope is not object');
        }
        if(!(element instanceof jQuery)){
          throw new Error('element is not jQuery object');
        }
        if(!_.isObject(parent)) {
          throw new Error('parent is not object');
        }
        this.scope = scope;
        this.element = element;
        this.parent = parent;
        this.iterable = new RevealSectionIterable();
        this.initScope();
      }

      RevealSection.prototype.initScope = function(){
        var self = this;
        this.scope.getClassByState = function(){
          return self.getClassByState();
        };
      };

      RevealSection.prototype.addSection = function(section){
        this.iterable.addSection(section);
      };

      RevealSection.prototype.hasSubSection = function(){
        return this.iterable.count() > 0;
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
          return 'present';
        } else if(this.state === 'prev'){
          return 'past';
        } else if(this.state === 'next'){
          return 'futur';
        }
        return '';
      };


      return RevealSection;
    }]);
})();

