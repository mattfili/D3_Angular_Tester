angular

.module('MapD3')

.controller('MapController', function (Brigade){
	(function() {
		Brigade.getGeoData(function (cb) {
			$scope.brigadeGeoData = cb
		})
	})


})