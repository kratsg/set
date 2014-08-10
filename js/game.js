'use strict';
(function(){

  var app = angular.module('setApp', []);

  app.controller('SetGameCtrl', ['$scope', function($scope) {
    $scope.deck = Helpers.loadJSON('cards.json');
    $scope.shuffleDeck = function(){
      Helpers.shuffleArray($scope.deck);
      console.log($scope.deck[0]);
    }
    console.log($scope.deck[0]);
  }]);

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
