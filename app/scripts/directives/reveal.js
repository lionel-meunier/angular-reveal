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

function Reveal(scope,element){
  this.scope = scope;
  this.element = element;
  this.iterable = new RevealSectionIte();
  this.slides = element.find('.slides');
}

Reveal.prototype.init = function(){

};

Reveal.prototype.addSection = function(section){
  this.iterable.addSection(section);
};

Reveal.prototype.removeSection = function(section){
  this.iterable.removeSection(section);
};
Reveal.prototype.getSection = function(){

};
Reveal.prototype.addProgress = function(){

};
Reveal.prototype.removeProgress = function(){

};
Reveal.prototype.getProgress = function(){

};
Reveal.prototype.addControls = function(controls){
  if(_.isObject(controls)){
    this.controls = controls;
  } else {
    throw new Error('Reveal controls is object');
  }

};
Reveal.prototype.removeControls = function(){

};
Reveal.prototype.getControls = function(){

};
Reveal.prototype.goToIndex = function(index){
  console.log('not implemented goToIndex',index);
};
Reveal.prototype.goToStack = function(stack){
  console.log('not implemented goToStack',stack);
};
Reveal.prototype.getIndex = function(element){
  var self = this;
  if(this.inStackElement(element)){

  } else {
    var index = _.indexOf(this.slides.find('.section').not(function(i,e){return self.inStackElement(angular.element(e))}),element.get(0));
    return index;
  }
  return 0;
};
Reveal.prototype.inStackElement = function(element){
  return element.parent('.section').length > 0;
};
Reveal.prototype.getStack = function(element){
  if(this.inStackElement(element)){

  } else {
    return -1;
  }
};


function RevealSectionIte(){
  this.sections = [];
  this.index = 0;
}

RevealSectionIte.prototype.removeSection = function(section){
  console.error('not implemanted');
};

RevealSectionIte.prototype.addSection = function(section){
  this.sections.push(section);
  //order by this index
  this.sections = _.sortBy(this.sections,function(el){
    return el.getIndex();
  });
  //update state
  this.updateState();
};

RevealSectionIte.prototype.count = function(){
  return this.sections.length;
};

RevealSectionIte.prototype.reset = function(){
  this.index = 0;
};

RevealSectionIte.prototype.next = function(){
  if(this.index < this.count() - 1){
    this.index++;
    this.updateState();
    return this.sections[this.index];
  } else {
    return null;
  }
};

RevealSectionIte.prototype.prev = function(){
  if(this.index > 0){
    this.index--;
    this.updateState();
    return this.sections[this.index];
  } else {
    return null;
  }
};

RevealSectionIte.prototype.current = function(){
  if(this.sections[this.index]){
    return this.sections[this.index];
  }
  return null;
};

RevealSectionIte.prototype.getNext = function(){
  if(this.index < this.count() - 1){
    return this.sections[this.index+1];
  } else {
    return {
      setState:function(){}
    };
  }
};

RevealSectionIte.prototype.getPrev = function(){
  if(this.index > 0){
    return this.sections[this.index-1];
  } else {
    return {
      setState:function(){}
    };
  }
};

RevealSectionIte.prototype.updateState = function(){
  var self = this;
  _.map(this.sections,function(el,ite){
    if(el !== self.current() && el !== self.getNext() && el !== self.getPrev() ) {
      el.setState();
    }
  });
  this.current().setState('current');
  this.getNext().setState('next');
  this.getPrev().setState('prev');
};

/**
 * @ngdoc directive
 * @name angularRevealApp.directive:reveal
 * @description
 * # reveal
 */
angular.module('angularRevealApp')
  .controller('RevealCtrl',['$scope','$window','$element',function($scope,$window,$element){

    this.reveal = new Reveal($scope,$element);

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

    this.addSection = function(element){
      var section = {
        element : element,
        index : calElementIndex(element),
        stack : calStackElement(element)
      };
      console.log(section);

      allSection.push(section);
      init();
    };

    this.getAllSection = function(element){
      return allSection;
    };

    this.addControls = function(controls){

    };

    this.addProgress = function(progress){

    };

  }])
  .directive('reveal', function () {
    return {
      restrict: 'EA',
      controller:'RevealCtrl',
      transclude: true,
      replace: true,
      templateUrl:'template/reveal.html',
      scope : {},
      link: function (scope, element, attrs) {
      }
    };
  });
