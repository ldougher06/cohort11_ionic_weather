// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .controller('weatherCtrl', function ($http) {

    var weather = this;
    var apikey = "b1bfe59eafecb190";
    var url = '/api/' + apikey + '/conditions/q/';

    $http.get(url + 'autoip.json').then(parseWUData);

    navigator.geolocation.getCurrentPosition(function (geoposition) {
      var lat = geoposition.coords.latitude;
      var long = geoposition.coords.longitude;

      $http
        .get(url + lat + ',' + long + '.json')
        .then(parseWUData);
    });

    weather.temp = '--.--';

    weather.search = function () {
      $http.get(url + weather.searchQuery + '.json')
      .then(parseWUData);
    }

    function parseWUData(res) {
      var data = res.data.current_observation;
      console.log("data", data);
      weather.location = data.display_location.full;
      weather.temp = parseInt(data.temp_f);
      weather.image = data.icon_url;
    }

  });

