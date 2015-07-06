/**
 * Created by lmeunier on 24/02/15.
 */
(function () {
    'use strict';
    angular.module('angularRevealApp').factory(
        'RevealSection',
        ['RevealSectionIterable',
            function (RevealSectionIterable) {

                function RevealSection(scope, element, parent) {
                    if (!_.isObject(scope)) {
                        throw new Error('scope is not object');
                    }
                    if (!(element instanceof jQuery)) {
                        throw new Error('element is not jQuery object');
                    }
                    if (!_.isObject(parent)) {
                        throw new Error('parent is not object');
                    }
                    this.scope = scope;
                    this.element = element;
                    this.parent = parent;
                    this.iterable = new RevealSectionIterable();
                    this.initScope();

                    this.eventSave = {};
                    var self = this;
                    element.on('mousedown', function (e) {
                        self.eventSave.mousedown = e;
                    });
                    element.on('mousemove', function (e) {
                        self.eventSave.mousemove = e;
                        self.moveSection()
                    });
                    element.on('mouseup', function (e) {
                        self.eventSave.mouseup = e;
                        if(!self.hasSubSection()){
                            self.updateIndex();
                        }
                        self.cleanElement();
                    });
                    element.on('mouseleave', function () {
                        self.cleanElement();
                    });
                }

                RevealSection.prototype.initScope = function () {
                    var self = this;
                    this.scope.getClassByState = function () {
                        return self.getClassByState();
                    };
                };

                RevealSection.prototype.addSection = function (section) {
                    this.iterable.addSection(section);
                };

                RevealSection.prototype.isSubSection = function () {
                    return _.isObject(this.parent.parent);
                };
                RevealSection.prototype.hasSubSection = function () {
                    return this.iterable.count() > 0;
                };

                RevealSection.prototype.getIndex = function () {
                    var self = this,
                        slides,
                        index;
                    if (this.isSubSection()) {
                        slides = this.element.parent('.section');
                        index = -1;
                        _.each(slides.find('.section'), function (el, ite) {
                            if (el === self.element.get(0)) {
                                index = ite;
                            }
                        });
                        return index;
                    } else {
                        slides = this.element.parent('.slides');
                        index = -1;
                        _.each(slides.find('.section'), function (el, ite) {
                            if (el === self.element.get(0)) {
                                index = ite;
                            }
                        });
                        return index;
                    }
                };

                RevealSection.prototype.setState = function (state) {
                    this.state = state;
                };

                RevealSection.prototype.moveSection = function () {
                    if (_.isObject(this.eventSave.mousedown) && _.isObject(this.eventSave.mousemove)) {
                        var x = this.eventSave.mousemove.clientX - this.eventSave.mousedown.clientX;
                        var y = this.eventSave.mousemove.clientY - this.eventSave.mousedown.clientY;
                        var max = Math.max(Math.abs(x), Math.abs(y));
                        if (max > 150) {
                            if (max === Math.abs(x)) {
                                this.element.css('transform', 'translate(' + x + 'px,0)');
                            } else {
                                this.element.css('transform', 'translate(0,' + y + 'px)');
                            }
                        } else {
                            this.element.css('transform', 'translate(' + x + 'px,' + y + 'px)');
                        }
                    }

                };

                RevealSection.prototype.updateIndex = function () {
                    var self = this;
                    if (_.isObject(this.eventSave.mousedown) && _.isObject(this.eventSave.mouseup)) {
                        var x = this.eventSave.mouseup.clientX - this.eventSave.mousedown.clientX;
                        var y = this.eventSave.mouseup.clientY - this.eventSave.mousedown.clientY;
                        var max = Math.max(Math.abs(x), Math.abs(y));
                        if (max > 150) {
                            var controls = this.parent.controls;
                            if (_.isUndefined(controls)) {
                                controls = this.parent.parent.controls;
                            }
                            var fnName;
                            if (max === Math.abs(x)) {
                                fnName = (x > 0) ? 'left' : 'right';
                            } else {
                                fnName = (y > 0) ? 'up' : 'down';
                            }
                            this.scope.$apply(function () {
                                console.log(fnName,self.element);
                                controls[fnName]();
                            });
                        }
                    }

                };

                RevealSection.prototype.cleanElement = function () {
                    this.element.removeAttr('style');
                    this.eventSave = {};
                };
                RevealSection.prototype.getClassByState = function () {
                    if (this.state === 'current') {
                        return 'present';
                    } else if (this.state === 'prev') {
                        return 'past';
                    } else if (this.state === 'next') {
                        return 'futur';
                    }
                    return '';
                };


                return RevealSection;
            }]);
})();

