/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  angular.module('angularRevealApp').factory(
    'RevealSectionIterable',
    [function () {
      function RevealSectionIterable() {
        this.sections = [];
        this.index = 0;
      }

      //controls position in iterable
      RevealSectionIterable.prototype.count = function () {
        return this.sections.length;
      };

      RevealSectionIterable.prototype.isFirst = function () {
        return this.index === 0;
      };

      RevealSectionIterable.prototype.isLast = function () {
        return this.index === this.count() - 1;
      };

      RevealSectionIterable.prototype.hasNext = function () {
        return !this.isLast();
      };
      RevealSectionIterable.prototype.hasPrev = function () {
        return !this.isFirst();
      };

      RevealSectionIterable.prototype.removeSection = function (section) {
        this.sections = _.without(this.sections,section);
        if(_.isUndefined(this.current())){
          if(this.hasPrev()){
            this.prev();
          }
        } else {

          this.sections = _.sortBy(this.sections, function (el) {
            return el.getIndex();
          });
          //update state
          this.updateState();
        }

      };

      RevealSectionIterable.prototype.addSection = function (section) {
        this.sections.push(section);
        //order by this index
        this.sections = _.sortBy(this.sections, function (el) {
          return el.getIndex();
        });
        //update state
        this.updateState();
      };

      RevealSectionIterable.prototype.next = function () {
        if (this.hasNext()) {
          this.index++;
          this.updateState();
          return this.sections[this.index];
        }
        return;
      };

      RevealSectionIterable.prototype.prev = function () {
        if (this.hasPrev()) {
          this.index--;
          this.updateState();
          return this.sections[this.index];
        }
        return;
      };

      RevealSectionIterable.prototype.first = function () {
        if (!this.isFirst()) {
          this.index = 0;
          this.updateState();
          return this.sections[this.index];
        }
        return;
      };

      RevealSectionIterable.prototype.last = function () {
        if (!this.isLast()) {
          this.index = this.count() - 1;
          this.updateState();
          return this.sections[this.index];
        }
        return;
      };

      RevealSectionIterable.prototype.current = function () {
        return this.sections[this.index];
      };

      RevealSectionIterable.prototype.updateState = function () {
        _.map(this.sections, function (el) {
          el.setState();
        });
        var current = this.current();
        if(current){
          current.setState('current');
        }
        if(this.hasNext()){
          if(this.sections[this.index+1]) {//TODO erreur a identifier
            this.sections[this.index + 1].setState('next');
          }
        }
        if(this.hasPrev()){
          if(this.sections[this.index-1]) {//TODO erreur a identifier
            this.sections[this.index - 1].setState('prev');
          }
        }
      };


      return RevealSectionIterable;
    }]);
})();

