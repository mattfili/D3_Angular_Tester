angular
	.module('MapD3', ['ui.router', 'ui.bootstrap', 'firebase'])
	
	.constant('FIRE_URL', 'https://stealadate.firebaseio.com/')

	.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'assets/landing.html'
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
  			getGeoData: function(cb) {
          $http
          .get('http://codeforamerica.org/api/organizations.geojson')
          .success(function (cb) {
            console.log('Brigade Geo Success')
          })


        }
	  			



      }
    });