'use strict';
(function(){

  var app = angular.module('set', []);

})();

//http://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH%208.23.11.pdf
var red      = 1,
    purple   = 2,
    green    = 3;

var oval     = 1,
    squiggle = 2,
    diamond  = 3;

var solid    = 1,
    striped  = 2,
    outlined = 3;

var cards = [
  {
    'number': 1,
    'color' : red,
    'shape' : diamond,
    'fill'  : solid
  },

]
