'use strict';

angular.module('MapD3', ['ui.router', 'ui.bootstrap', 'firebase']).constant('FIRE_URL', 'https://stealadate.firebaseio.com/').config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'assets/landing.html',
    controller: 'MapController',
    controllerAs: 'MapController'
  }).state('start', {
    abstract: true,
    url: '/dash',
    templateUrl: 'assets/dash.html'
  }).state('start.dash', {
    views: {
      'mapdash': {
        url: '',
        templateUrl: '',
        controller: '',
        controllerAs: ''
      }
    }
  });
}).factory('Brigade', function ($http) {
  return {

    getGeoData: function getGeoData() {
      return $http.get('http://codeforamerica.org/api/organizations.geojson').then(function (data) {
        return data;
      });
    },

    getBrigadeData: function getBrigadeData() {
      return $http.get('https://cfn-brigadepulse.firebaseio.com/brigadeInfo.json').then(function (data) {
        return data;
      });
    }

  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9tYWluLmNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FDTCxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUUxRCxRQUFRLENBQUMsVUFBVSxFQUFFLG9DQUFvQyxDQUFDLENBRTFELE1BQU0sQ0FBQyxVQUFVLGNBQWMsRUFBRSxrQkFBa0IsRUFBRTs7QUFFbkQsZ0JBQWMsQ0FDVCxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2IsT0FBRyxFQUFFLE9BQU87QUFDWixlQUFXLEVBQUUscUJBQXFCO0FBQ2xDLGNBQVUsRUFBRSxlQUFlO0FBQzNCLGdCQUFZLEVBQUUsZUFBZTtHQUM5QixDQUFDLENBRUYsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNiLFlBQVEsRUFBRSxJQUFJO0FBQ2QsT0FBRyxFQUFFLE9BQU87QUFDWixlQUFXLEVBQUUsa0JBQWtCO0dBQ2pDLENBQUMsQ0FFQSxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQ25CLFNBQUssRUFBRTtBQUNMLGVBQVMsRUFBRTtBQUNULFdBQUcsRUFBRSxFQUFFO0FBQ1AsbUJBQVcsRUFBRSxFQUFFO0FBQ2Ysa0JBQVUsRUFBRSxFQUFFO0FBQ2Qsb0JBQVksRUFBRSxFQUFFO09BQ2pCO0tBQ0Y7R0FDRixDQUFDLENBQUE7Q0FFTixDQUFDLENBRUQsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNwQyxTQUFPOztBQUVOLGNBQVUsRUFBRSxzQkFBWTtBQUNuQixhQUFPLEtBQUssQ0FDVCxHQUFHLENBQUMscURBQXFELENBQUMsQ0FDMUQsSUFBSSxDQUNILFVBQVUsSUFBSSxFQUFFO0FBQ2QsZUFBTyxJQUFJLENBQUE7T0FDWixDQUFDLENBQUE7S0FDUDs7QUFFRCxrQkFBYyxFQUFFLDBCQUFZO0FBQzFCLGFBQU8sS0FBSyxDQUNULEdBQUcsQ0FBQywwREFBMEQsQ0FBQyxDQUMvRCxJQUFJLENBQ0gsVUFBVSxJQUFJLEVBQUU7QUFDZCxlQUFPLElBQUksQ0FBQTtPQUNaLENBQUMsQ0FBQTtLQUNQOztHQUdGLENBQUE7Q0FDRixDQUFDLENBQUMiLCJmaWxlIjoic3JjL2pzL21haW4uY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhclxuXHQubW9kdWxlKCdNYXBEMycsIFsndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCcsICdmaXJlYmFzZSddKVxuXHRcblx0LmNvbnN0YW50KCdGSVJFX1VSTCcsICdodHRwczovL3N0ZWFsYWRhdGUuZmlyZWJhc2Vpby5jb20vJylcblxuXHQuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXNzZXRzL2xhbmRpbmcuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogXCJNYXBDb250cm9sbGVyXCIsXG4gICAgICAgICAgY29udHJvbGxlckFzOiBcIk1hcENvbnRyb2xsZXJcIlxuICAgICAgICB9KVxuXG4gICAgICBcdC5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgdXJsOiAnL2Rhc2gnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXNzZXRzL2Rhc2guaHRtbCdcbiAgICAgIFx0fSlcblxuICAgICAgICAuc3RhdGUoJ3N0YXJ0LmRhc2gnLCB7XG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdtYXBkYXNoJzoge1xuICAgICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJcIixcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJcIixcbiAgICAgICAgICAgICAgY29udHJvbGxlckFzOiBcIlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gIFx0fSlcblxuICBcdC5mYWN0b3J5KCdCcmlnYWRlJywgZnVuY3Rpb24gKCRodHRwKSB7XG4gIFx0XHRyZXR1cm4ge1xuXG4gIFx0XHRcdGdldEdlb0RhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgIC5nZXQoJ2h0dHA6Ly9jb2RlZm9yYW1lcmljYS5vcmcvYXBpL29yZ2FuaXphdGlvbnMuZ2VvanNvbicpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldEJyaWdhZGVEYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAuZ2V0KCdodHRwczovL2Nmbi1icmlnYWRlcHVsc2UuZmlyZWJhc2Vpby5jb20vYnJpZ2FkZUluZm8uanNvbicpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgfVxuICAgIH0pOyJdfQ==
