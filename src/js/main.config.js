angular
	.module('MapD3', ['ui.router', 'ui.bootstrap', 'firebase', 'd3'])
	
	.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'assets/landing.html',
          controller: "MapController",
          controllerAs: "MapController"
        })

      	.state('start', {
          abstract: true,
          url: '/dash',
          templateUrl: 'assets/dash.html'
      	})

        .state('start.dash', {
          views: {
            'mapdash': {
              url: '',
              templateUrl: "",
              controller: "",
              controllerAs: ""
            }
          }
        })

  	})

  	.factory('Brigade', function ($http) {
  		return {

  			getGeoData: function () {
          return $http
            .get('http://codeforamerica.org/api/organizations.geojson')
            .then(
              function (data) {
                return data
              })
        },

        getBrigadeData: function () {
          return $http
            .get('https://cfn-brigadepulse.firebaseio.com/brigadeInfo.json')
            .then(
              function (data) {
                return data
              })
        }


      }
    });