'use strict';
(function(){

  var app = angular.module('setApp', ['d3']);

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

  app.directive('card', ['d3Service', function(d3Service){
    return {
      restrict: 'EA', //only element or attribute
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3){
          //console.log(scope, element, attrs);
          //console.log(scope.$parent.card);
          //d3 is the raw d3 object
          var svg = d3.select(element[0])
            .append("svg");
        });
      },
    };
  }]);


  var SetGameCtrl = function(){
    this.deck = [];
    this.table = [];
    this.active = [];
    this.numSets = 0;

    this.shuffleDeck = function(){
      Helpers.shuffleArray(this.deck);
    };
    this.shuffleTable = function(){
      Helpers.shuffleArray(this.table);
    };
    this.findSets = function(){
      var sets = GameHelpers.findSets(this.table);
      this.numSets = sets.length;
      return sets;
    };
    this.drawCards = function(n){
      // only draw as many as we have left
      n = Math.min(n, this.deck.length);
      for(var i=0; i < n; i++){
        var newCard = this.deck.shift()
        this.table.push(newCard);
      }
      this.findSets();
    };
    this.selectCard = function(card){
      var active = this.is_active(card);
      if(this.active.length == 3 && !active) return false;
      if(!active){
        this.active.push(card);
      }else{
        this.active = Helpers.delVal(this.active, card);
      }
      return true;
    };
    this.is_active = function(card){
      return this.active.indexOf(card) != -1;
    }

    this.deck = Helpers.loadJSON('cards.json');
    //loaded, shuffle then draw 9 cards
    this.shuffleDeck();
    this.drawCards(9);
    this.findSets();
  }

  app.controller('SetGameCtrl',SetGameCtrl);

})();

var GameHelpers = (function() {
  // Not the most elegant or scalable way to determine a set, but it works!
  // Note: This is poor design and requires that a, b and c be the same objects
  // etc. etc. But for now I'm happy enough.
  var isSet = function(cards){
    for(var prop in cards[0]){
      // skip prototype properties
      // also skip ngRepeat properties for dom manipulation
      if(cards[0].hasOwnProperty(prop) && prop.indexOf('$') === -1){
        // make array of values for that property
        var l = cards.map(function(obj){return obj[prop];});
        // make that array unique 
        var l_unique = Helpers.uniqueArray(l);
        // a set will have all items same (length = 1) or all diff (length = same)
        // if(l_unique.length == 2) return false; // also works, but less robust
        if( l_unique.length != 1 && l_unique.length != l.length ) return false;
      }
    }
    return true;
  };

  // Find all sets by iterating through all triples. Again, not elegant but works
  var findSets = function(arr){
    var sets = [];
    for (var i=0; i < arr.length - 2;i++){
        for (var j=i+1; j < arr.length-1;j++){
            for (var k=j+1; k < arr.length;k++){
                if (isSet( [arr[i],arr[j],arr[k]] )){
                    sets.push([arr[i],arr[j],arr[k]]);
                }
            }
        }
    }
    return sets;
  };

  // Find all sets by iterating through all triples. Again, not elegant but works
  var findSet = function(arr){
    for (var i=0; i < arr.length - 2;i++){
        for (var j=i+1; j < arr.length-1;j++){
            for (var k=j+1; k < arr.length;k++){
                if (isSet( [arr[i],arr[j],arr[k]] )){
                    return [arr[i],arr[j],arr[k]];
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
