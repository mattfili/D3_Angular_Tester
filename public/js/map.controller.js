'use strict';

angular.module('MapD3').controller('MapController', function (Brigade) {
	var vm = this;

	//- Load Brigade data onto MapController Scope with Brigade Factory
	Brigade.getGeoData().then(function (geoData) {
		vm.geoData = geoData.data.features;
	});
	Brigade.getBrigadeData().then(function (brigades) {
		vm.brigadeData = brigades.data;
		vm.brigadeData.total = brigades.data.length;
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9tYXAuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FFTixNQUFNLENBQUMsT0FBTyxDQUFDLENBRWYsVUFBVSxDQUFDLGVBQWUsRUFBRSxVQUFVLE9BQU8sRUFBQztBQUM5QyxLQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7OztBQUdkLFFBQU8sQ0FBQyxVQUFVLEVBQUUsQ0FDbEIsSUFBSSxDQUNKLFVBQVMsT0FBTyxFQUFFO0FBQ2pCLElBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7RUFDbkMsQ0FBQyxDQUFBO0FBQ0gsUUFBTyxDQUFDLGNBQWMsRUFBRSxDQUN0QixJQUFJLENBQ0osVUFBUyxRQUFRLEVBQUU7QUFDbEIsSUFBRSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO0FBQzlCLElBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0VBQzNDLENBQUMsQ0FBQTtDQU1KLENBQUMsQ0FBQSIsImZpbGUiOiJzcmMvanMvbWFwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXG5cbi5tb2R1bGUoJ01hcEQzJylcblxuLmNvbnRyb2xsZXIoJ01hcENvbnRyb2xsZXInLCBmdW5jdGlvbiAoQnJpZ2FkZSl7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0Ly8tIExvYWQgQnJpZ2FkZSBkYXRhIG9udG8gTWFwQ29udHJvbGxlciBTY29wZSB3aXRoIEJyaWdhZGUgRmFjdG9yeVxuXHRCcmlnYWRlLmdldEdlb0RhdGEoKVxuXHRcdC50aGVuKFxuXHRcdFx0ZnVuY3Rpb24oZ2VvRGF0YSkge1xuXHRcdFx0XHR2bS5nZW9EYXRhID0gZ2VvRGF0YS5kYXRhLmZlYXR1cmVzXG5cdFx0fSlcblx0QnJpZ2FkZS5nZXRCcmlnYWRlRGF0YSgpXG5cdFx0LnRoZW4oXG5cdFx0XHRmdW5jdGlvbihicmlnYWRlcykge1xuXHRcdFx0XHR2bS5icmlnYWRlRGF0YSA9IGJyaWdhZGVzLmRhdGFcblx0XHRcdFx0dm0uYnJpZ2FkZURhdGEudG90YWwgPSBicmlnYWRlcy5kYXRhLmxlbmd0aFxuXHRcdFx0fSlcblx0XG5cblxuXG5cbn0pIl19
