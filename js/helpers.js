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

  //expose it to the world
  return {
    loadJSON: loadJSON,
  }
})();
