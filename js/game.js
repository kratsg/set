'use strict';
(function(){

  var app = angular.module('setApp', []);

  //http://stackoverflow.com/questions/21644493/how-to-split-the-ng-repeat-data-with-three-columns-using-bootstrap
  app.filter('partition', function() {
    var cache = {};
    var filter = function(arr, size) {
      if (!arr) { return; }
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      var arrString = JSON.stringify(arr);
      var fromCache = cache[arrString+size];
      if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
        return fromCache;
      }
      cache[arrString+size] = newArr;
      return newArr;
    };
    return filter;
  });

  // why do I write filters this way? Probably to encapsulate code
  app.filter('color', function(){
    return function(num){
      // '', 'red', 'purple', 'green'
      var colors = ['','#CC0000','#CC00CC','#00CC00'];
      return colors[num];
    };
  });


  var SetGameCtrl = function(){
    this.deck = Helpers.loadJSON('cards.json');
    this.shuffleDeck = function(){
      Helpers.shuffleArray(this.deck);
    }
  }

  app.controller('SetGameCtrl',SetGameCtrl);

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
