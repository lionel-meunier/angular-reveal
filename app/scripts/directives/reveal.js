'use strict';
// Configurations defaults, can be overridden at initialization time
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
 * @ngdoc directive
 * @name angularRevealApp.directive:reveal
 * @description
 * # reveal
 */
angular.module('angularRevealApp')
  .controller('RevealCtrl',['$scope','$window','$element',function($scope,$window,$element){
    var dom = {
      wrapper : $element.get(0)
    };
    var slides = $element.find('.slides');

    function getComputedSlideSize( presentationWidth, presentationHeight ) {
      var size = {
        // Slide size
        width: config.width,
        height: config.height,

        // Presentation size
        // dom.wrapper.offsetWidth => $element.offsetWidth ?? a vérifier
        presentationWidth: presentationWidth || dom.wrapper.offsetWidth,
        presentationHeight: presentationHeight || dom.wrapper.offsetHeight
      };
      // Reduce available space by margin
      size.presentationWidth -= ( size.presentationHeight * config.margin );
      size.presentationHeight -= ( size.presentationHeight * config.margin );

      // Slide width may be a percentage of available width
      if( typeof size.width === 'string' && /%$/.test( size.width ) ) {
        size.width = parseInt( size.width, 10 ) / 100 * size.presentationWidth;
      }

      // Slide height may be a percentage of available height
      if( typeof size.height === 'string' && /%$/.test( size.height ) ) {
        size.height = parseInt( size.height, 10 ) / 100 * size.presentationHeight;
      }

      return size;

    }

    function calZoom(){
      var size =  getComputedSlideSize();

      var scale = Math.min( size.presentationWidth / size.width, size.presentationHeight / size.height );
      // Respect max/min scale settings
      scale = Math.max( scale, config.minScale );
      scale = Math.min( scale, config.maxScale );

      slides.width(config.width);
      slides.height(config.height);
      slides.css('zoom',scale);

    }

    function testZoom() {
      calZoom();
    }

    angular.element($window).on('resize',function(){
      testZoom();
    });
    testZoom();

    function inStackElement(element){
      return element.parent('.section').length > 0;
    }

    function calElementIndex(element){
      if(inStackElement(element)){

      } else {
        return _.indexOf(slides.find('.section').not(function(i,e){return inStackElement(angular.element(e))}),element.get(0));
      }
    }
    function calStackElement(element){
      if(inStackElement(element)){

      } else {
        return -1;
      }
    }
    var allSection = [];
    var activeIndex = 0;
    var activeStack = -1;
    this.addSection = function(element){
      var section = {
        element : element,
        index : calElementIndex(element),
        stack : calStackElement(element)
      }
      console.log(section);

      allSection.push(section);
      init();
    };

    function init(){
      var presentSection = _.find(allSection,function(el){
        return el.stack === activeStack && el.index === activeIndex;
      });
      var pastSection = _.find(allSection,function(el){
        return el.stack === activeStack && el.index === activeIndex-1;
      });
      var futurSection = _.find(allSection,function(el){
        return el.stack === activeStack && el.index === activeIndex+1;
      });
      presentSection.element.addClass('present');
      if(pastSection){
        pastSection.element.addClass('past');
      }
      if(futurSection) {
        futurSection.element.addClass('futur');
      }
    }

  }])
  .directive('reveal', function () {
    return {
      restrict: 'EA',
      controller:'RevealCtrl',
      transclude: true,
      replace: true,
      templateUrl:'template/reveal.html',
      link: function (scope, element, attrs) {
        console.log(element.html());
      }
    };
  });
