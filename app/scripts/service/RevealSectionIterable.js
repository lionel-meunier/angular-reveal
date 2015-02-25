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

      RevealSectionIterable.prototype.removeSection = function () {
        console.error('not implemanted');
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

      RevealSectionIterable.prototype.count = function () {
        return this.sections.length;
      };

      RevealSectionIterable.prototype.reset = function () {
        this.index = 0;
      };

      RevealSectionIterable.prototype.next = function () {
        if (this.index < this.count() - 1) {
          this.index++;
          this.updateState();
          return this.sections[this.index];
        } else {
          return null;
        }
      };

      RevealSectionIterable.prototype.prev = function () {
        if (this.index > 0) {
          this.index--;
          this.updateState();
          return this.sections[this.index];
        } else {
          return null;
        }
      };

      RevealSectionIterable.prototype.first = function () {
        if (this.count() > 0) {
          this.index = 0;
          this.updateState();
          return this.sections[this.index];
        } else {
          return null;
        }
      };

      RevealSectionIterable.prototype.last = function () {
        if (this.count() > 0) {
          this.index = this.count() - 1;
          this.updateState();
          return this.sections[this.index];
        } else {
          return null;
        }
      };

      RevealSectionIterable.prototype.current = function () {
        if (this.sections[this.index]) {
          return this.sections[this.index];
        }
        return null;
      };

      RevealSectionIterable.prototype.getNext = function () {
        if (this.index < this.count() - 1) {
          return this.sections[this.index + 1];
        } else {
          return {
            setState: function () {
            }
          };
        }
      };

      RevealSectionIterable.prototype.getPrev = function () {
        if (this.index > 0) {
          return this.sections[this.index - 1];
        } else {
          return {
            setState: function () {
            }
          };
        }
      };

      RevealSectionIterable.prototype.updateState = function () {
        var self = this;
        _.map(this.sections, function (el) {
          if (el !== self.current() && el !== self.getNext() && el !== self.getPrev()) {
            el.setState();
          }
        });
        this.current().setState('current');
        this.getNext().setState('next');
        this.getPrev().setState('prev');
      };

      return RevealSectionIterable;
    }]);
})();

