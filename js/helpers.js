'use strict';

var Helpers = (function() {
  //everything inside is now private
  var loadJSON = function(filename){
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "json/"+filename,
      'dataType': "json",
      'success': function (data) {
        json = data;
      }
    });
    return json;
  };

  var shuffleArray = function(array){
    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex =  array.length,
                        temporaryValue,
                        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  //expose it to the world
  return {
    loadJSON: loadJSON,
    shuffleArray: shuffleArray,
  }
})();
