angular
	.module('MapD3', ['ui.router', 'ui.bootstrap', 'firebase', 'd3'])
	
	.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      	.state('start', {
          abstract: true,
          url: '/dash',
          templateUrl: 'assets/landing.html',
          controller: "MapController",
          controllerAs: "MapController"
      	})

        .state('start.dash', {
          views: {
            'mapdash': {
              url: '',
            },
            'sidenav': {
              url: '',
              templateUrl: 'assets/sidenav.html'
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