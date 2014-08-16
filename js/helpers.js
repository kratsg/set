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

  var uniqueArray = function(array){
    var a = [], l = array.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++)
            if (array[i] === array[j]) j = ++i;
      a.push(array[i]);
    }
    return a;
  };

  //expose it to the world
  return {
    loadJSON: loadJSON,
    shuffleArray: shuffleArray,
    uniqueArray: uniqueArray,
  }
})();

// http://www.ng-newsletter.com/posts/d3-on-angular.html
angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
}]);

