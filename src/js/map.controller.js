angular

.module('MapD3')

.controller('MapController', function (Brigade){
	var vm = this;
		
	(function() { 
		Brigade.getGeoData()
		.then(
			function(geoData) {
				vm.data = geoData
			}
		)
	})();	




})