/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
  'use strict';
  angular.module('angularRevealApp').factory(
    'Reveal',
    [
      'RevealSectionIterable',
      '$window',
      function (RevealSectionIterable,
                $window) {

        var config = {
          // The "normal" size of the presentation, aspect ratio will be preserved
          // when the presentation is scaled to fit different resolutions
          width: 960,
          height: 700,

          // Factor of the display size that should remain empty around the content
          margin: 0.1,

          // Bounds for smallest/largest possible scale to apply to content
          minScale: 0.2,
          maxScale: 1.5
        };

        /**
         * Reveal main object control list
         * @param scope
         * @param element
         * @constructor
         */
        function Reveal(scope, element) {
          if (!_.isObject(scope)) {
            throw new Error('scope is not object');
          }
          if (!(element instanceof jQuery)) {
            throw new Error('element is not jQuery object');
          }

          this.scope = scope;
          this.element = element;
          this.iterable = new RevealSectionIterable();
          this.slides = element.find('.slides');
          this.calculationZoomSlides();
          var self = this;
          angular.element($window).on('resize', function () {
            self.calculationZoomSlides();
          });
        }

        Reveal.prototype.getComputedSlideSize = function (presentationWidth, presentationHeight) {
          var size = {
            // Slide size
            width: config.width,
            height: config.height,

            // Presentation size
            // dom.wrapper.offsetWidth => $element.offsetWidth ?? a vérifier
            presentationWidth: presentationWidth || this.element.width(),
            presentationHeight: presentationHeight || this.element.height()
          };
          // Reduce available space by margin
          size.presentationWidth -= ( size.presentationHeight * config.margin );
          size.presentationHeight -= ( size.presentationHeight * config.margin );

          // Slide width may be a percentage of available width
          if (typeof size.width === 'string' && /%$/.test(size.width)) {
            size.width = parseInt(size.width, 10) / 100 * size.presentationWidth;
          }

          // Slide height may be a percentage of available height
          if (typeof size.height === 'string' && /%$/.test(size.height)) {
            size.height = parseInt(size.height, 10) / 100 * size.presentationHeight;
          }
          return size;
        };

        Reveal.prototype.calculationZoomSlides = function () {
          var size = this.getComputedSlideSize();
          var scale = Math.min(size.presentationWidth / size.width, size.presentationHeight / size.height);
          // Respect max/min scale settings
          scale = Math.max(scale, config.minScale);
          scale = Math.min(scale, config.maxScale);
          this.slides.width(config.width);
          this.slides.height(config.height);
          this.slides.css('zoom', scale);
        };

        Reveal.prototype.getConfig = function () {
          return config;
        };

        Reveal.prototype.addSection = function (section) {
          this.iterable.addSection(section);
        };

        Reveal.prototype.removeSection = function (section) {
          this.iterable.removeSection(section);
        };
        Reveal.prototype.getSection = function () {

        };
        Reveal.prototype.addProgress = function () {

        };
        Reveal.prototype.removeProgress = function () {

        };
        Reveal.prototype.getProgress = function () {

        };

        Reveal.prototype.addControls = function (controls) {
          if (!_.isObject(controls)) {
            throw new Error('controls is not object');
          }
          if (!_.isFunction(controls.setParent)) {
            throw new Error('controls has not method setParent');
          }
          this.controls = controls;
          this.controls.setParent(this);
        };

        Reveal.prototype.removeControls = function () {

        };
        Reveal.prototype.getControls = function () {

        };
        Reveal.prototype.goToIndex = function (index) {
          console.log('not implemented goToIndex', index);
        };
        Reveal.prototype.goToStack = function (stack) {
          console.log('not implemented goToStack', stack);
        };
        Reveal.prototype.getIndex = function (element) {
          var self = this;
          if (this.inStackElement(element)) {

          } else {
            var index = _.indexOf(this.slides.find('.section').not(function (i, e) {
              return self.inStackElement(angular.element(e));
            }), element.get(0));
            return index;
          }
          return 0;
        };
        Reveal.prototype.inStackElement = function (element) {
          return element.parent('.section').length > 0;
        };
        Reveal.prototype.getStack = function (element) {
          if (this.inStackElement(element)) {

          } else {
            return -1;
          }
        };

        return Reveal;
      }]);
})();

