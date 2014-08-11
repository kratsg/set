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

var GameHelpers = (function() {
  // Not the most elegant or scalable way to determine a set, but it works!
  // Note: This is poor design and requires that a, b and c be the same objects
  // etc. etc. But for now I'm happy enough.
  var isSet = function(){
    for(var prop in arguments[0]){
      l = arguments.map(function(obj){return obj.prop;});
      if (l[0] == 1 && l[1] == 3){
        return false;
      } else if(l[0] == 1 && l[2] == 2){
        return false;
      } else if(l[0] == 2 && l[2] != 2){
        return false;
      }
    }
    return true;
  };

  // Find all sets by iterating through all triples. Again, not elegant but works
  var findSets = function(arr){
    sets = [];
    for (var i=0; i < list.length - 2;i++){
        for (var j=i+1; j < list.length-1;j++){
            for (var k=j+1; k < list.length;k++){
                if (isSet(list[i],list[j],list[k])){
                    sets.push([list[i],list[j],list[k]]);
                }
            }
        }
    }
    return sets;
  };

  // Find all sets by iterating through all triples. Again, not elegant but works
  var findSet = function(arr){
    for (var i=0; i < list.length - 2;i++){
        for (var j=i+1; j < list.length-1;j++){
            for (var k=j+1; k < list.length;k++){
                if (isSet(list[i],list[j],list[k])){
                    return [list[i],list[j],list[k]];
                }
            }
        }
    }
    return [];
  };
 
  return {
    isSet: isSet,
    findSets: findSets,
    findSet: findSet,
  }

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
