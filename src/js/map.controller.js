angular

.module('MapD3')

.controller('MapController', function (Brigade, $scope){
	var vm = this;


	//- Load Brigade data onto MapController Scope with Brigade Factory
	Brigade.getGeoData()
		.then(
			function(geoData) {
				vm.geoData = geoData.data.features
		})
	Brigade.getBrigadeData()
		.then(
			function(brigades) {
				vm.brigadeData = brigades.data
				vm.brigadeData.total = brigades.data.length
			})
	




})