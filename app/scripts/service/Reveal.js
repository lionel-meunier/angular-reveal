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
          this.elementWrap = element.find('.slides');
          this.iterable = new RevealSectionIterable(this.elementWrap);
          this.calculationZoomSlides();


          var self = this;
          angular.element($window).on('resize', function () {
            self.calculationZoomSlides();
          });

          angular.element($window).on('keydown', function (e) {
            self.scope.$applyAsync(function () {
              self.onKeydown(e);
            });
          });

          angular.element($window).on('keypress', function (e) {
            self.scope.$applyAsync(function () {
              self.onKeypress(e);
            });
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
          this.elementWrap.width(config.width);
          this.elementWrap.height(config.height);
          this.elementWrap.css('zoom', scale);
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

        Reveal.prototype.onKeydown = function (event) {
          //n, space next slide
          if (event.keyCode === 32 || event.keyCode === 78) {
            this.controls.next();
          }
          //p previous slide
          if (event.keyCode === 80) {
            this.controls.prev();
          }
          //<-, h navigate left
          if (event.keyCode === 37 || event.keyCode === 72) {
            this.controls.left();
          }
          //^, k navigate up
          if (event.keyCode === 38 || event.keyCode === 75) {
            this.controls.up();
          }
          //->, l navigate right
          if (event.keyCode === 39 || event.keyCode === 76) {
            this.controls.right();
          }
          //-^, J navigate down
          if (event.keyCode === 40 || event.keyCode === 74) {
            this.controls.down();
          }
          //home first slide
          if (event.keyCode === 36) {
            this.controls.first();
          }
          //end last slide
          if (event.keyCode === 35) {
            this.controls.last();
          }
          //b pause (play ??)
          if (event.keyCode === 66) {
            console.log('pause not implemented');
          }
          //f fullscreen
          if (event.keyCode === 70) {
            console.log('fullscreen not implemented');
          }
          //ESC, O slide overview
          if (event.keyCode === 27 || event.keyCode === 79) {
            console.log('slide overview not implemented');
          }
        };
        Reveal.prototype.onKeypress = function (event) {
          //Shift + , open overlay
          console.log(event.charCode, 'event onKeypress not implemented');
          if (event.shiftKey && event.charCode === 63) {
            console.log(event, 'event onKeypress not implemented');
          }

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

        return Reveal;
      }]);
})();

