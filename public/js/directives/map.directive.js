'use strict';

angular.module('d3', [])

//- assures d3 works onload and async
.factory('d3Serv', ['$document', '$q', '$rootScope', function ($document, $q, $rootScope) {
	var d = $q.defer();
	function onScriptLoad() {
		// Load client in the browser
		$rootScope.$apply(function () {
			d.resolve(window.d3);
		});
	}
	// Create a script tag with d3 as the source
	// and call our onScriptLoad callback when it
	// has been loaded
	var scriptTag = $document[0].createElement('script');
	scriptTag.type = 'text/javascript';
	scriptTag.async = true;
	scriptTag.src = 'http://d3js.org/d3.v3.min.js';
	scriptTag.onreadystatechange = function () {
		if (this.readyState == 'complete') onScriptLoad();
	};
	scriptTag.onload = onScriptLoad;

	var s = $document[0].getElementsByTagName('body')[0];
	s.appendChild(scriptTag);

	return {
		d3: function d3() {
			return d.promise;
		}
	};
}]);

angular.module('MapD3').directive('map', function (d3Serv, $q) {
	return {
		restrict: 'E',
		scope: {},
		link: function link(scope, element, attrs) {
			d3Serv.d3().then(function (d3) {

				element = element[0];
				var width = 1000;
				var height = 700;

				var svg = d3.select(element).append('svg').attr('width', width).attr('height', height);

				var projection = d3.geo.mercator().scale((width + 1) / 2 / Math.PI).translate([width / 2, height / 2]).precision(.1);

				var path = d3.geo.path().projection(projection);

				var worldMap = d3.map({});

				d3.json('world.json', function (err, globe) {
					var world = svg.append('g').attr('class', 'world').selectAll('g').data(topojson.feature(globe, globe.objects.subunits).features).enter().append('g');
					console.log(globe.objects);

					world.append('path').attr('d', path);
				});
			});
		}
	};
});
// function asynchLoad(jsonFile) {
// 	var deferred = $q.defer()
// 	deferred.resolve(d3.json, jsonFile)
// 	return deferred.promise;
// }

// var promise = asynchLoad('world.json')
// 	promise.then(function (err, world) {
// 		var world = svg.append('g')
// 			.attr('class', 'world')
// 			.selectAll('g')
// 			.data(topojson.feature(world, world.objects.states))
// 			.enter()
// 			.append("g")

// 		word.append('path')
// 			.attr('d', path);

// 		$scope.worlddata = world.objects
// 	})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9kaXJlY3RpdmVzL21hcC5kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBRU4sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7OztDQUdoQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQy9DLFVBQVMsU0FBUyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUU7QUFDbEMsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25CLFVBQVMsWUFBWSxHQUFHOztBQUV0QixZQUFVLENBQUMsTUFBTSxDQUFDLFlBQVc7QUFBRSxJQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUFFLENBQUMsQ0FBQztFQUN6RDs7OztBQUlELEtBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsVUFBUyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUNuQyxVQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUN2QixVQUFTLENBQUMsR0FBRyxHQUFHLDhCQUE4QixDQUFDO0FBQy9DLFVBQVMsQ0FBQyxrQkFBa0IsR0FBRyxZQUFZO0FBQ3pDLE1BQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUM7RUFDbkQsQ0FBQTtBQUNELFVBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDOztBQUVoQyxLQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsRUFBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFekIsUUFBTztBQUNMLElBQUUsRUFBRSxjQUFXO0FBQUUsVUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDO0dBQUU7RUFDckMsQ0FBQztDQUNQLENBQUMsQ0FBQyxDQUFDOztBQUVKLE9BQU8sQ0FFTixNQUFNLENBQUMsT0FBTyxDQUFDLENBRWYsU0FBUyxDQUFDLEtBQUssRUFBRSxVQUFVLE1BQU0sRUFBRSxFQUFFLEVBQUU7QUFDdkMsUUFBTztBQUNOLFVBQVEsRUFBRSxHQUFHO0FBQ2IsT0FBSyxFQUFFLEVBQUU7QUFDVCxNQUFJLEVBQUUsY0FBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNyQyxTQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVMsRUFBRSxFQUFFOztBQUU3QixXQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3BCLFFBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRWpCLFFBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDYixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUUxQixRQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUMxQixLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBLEdBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDaEMsU0FBUyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDbEMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBOztBQUVsQixRQUFJLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUNwQixVQUFVLENBQUMsVUFBVSxDQUFDLENBQUE7O0FBRTFCLFFBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDckIsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBQztBQUM3QyxTQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUN0QixTQUFTLENBQUMsR0FBRyxDQUFDLENBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQzlELEtBQUssRUFBRSxDQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNaLFlBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztBQUUxQixVQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNsQixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ25CLENBQUMsQ0FBQTtJQUVGLENBQUMsQ0FBQTtHQTBCTDtFQUNELENBQUE7Q0FDRCxDQUFDLENBQUEiLCJmaWxlIjoic3JjL2pzL2RpcmVjdGl2ZXMvbWFwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXJcblxuLm1vZHVsZSgnZDMnLCBbXSlcblxuLy8tIGFzc3VyZXMgZDMgd29ya3Mgb25sb2FkIGFuZCBhc3luY1xuLmZhY3RvcnkoJ2QzU2VydicsIFsnJGRvY3VtZW50JywgJyRxJywgJyRyb290U2NvcGUnLFxuICAgIGZ1bmN0aW9uKCRkb2N1bWVudCwgJHEsICRyb290U2NvcGUpIHtcbiAgICAgIHZhciBkID0gJHEuZGVmZXIoKTtcbiAgICAgIGZ1bmN0aW9uIG9uU2NyaXB0TG9hZCgpIHtcbiAgICAgICAgLy8gTG9hZCBjbGllbnQgaW4gdGhlIGJyb3dzZXJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7IGQucmVzb2x2ZSh3aW5kb3cuZDMpOyB9KTtcbiAgICAgIH1cbiAgICAgIC8vIENyZWF0ZSBhIHNjcmlwdCB0YWcgd2l0aCBkMyBhcyB0aGUgc291cmNlXG4gICAgICAvLyBhbmQgY2FsbCBvdXIgb25TY3JpcHRMb2FkIGNhbGxiYWNrIHdoZW4gaXRcbiAgICAgIC8vIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgdmFyIHNjcmlwdFRhZyA9ICRkb2N1bWVudFswXS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdFRhZy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IFxuICAgICAgc2NyaXB0VGFnLmFzeW5jID0gdHJ1ZTtcbiAgICAgIHNjcmlwdFRhZy5zcmMgPSAnaHR0cDovL2QzanMub3JnL2QzLnYzLm1pbi5qcyc7XG4gICAgICBzY3JpcHRUYWcub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIG9uU2NyaXB0TG9hZCgpO1xuICAgICAgfVxuICAgICAgc2NyaXB0VGFnLm9ubG9hZCA9IG9uU2NyaXB0TG9hZDtcblxuICAgICAgdmFyIHMgPSAkZG9jdW1lbnRbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICAgIHMuYXBwZW5kQ2hpbGQoc2NyaXB0VGFnKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZDM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZC5wcm9taXNlOyB9XG4gICAgICB9O1xufV0pO1xuXG5hbmd1bGFyXG5cbi5tb2R1bGUoJ01hcEQzJylcblxuLmRpcmVjdGl2ZSgnbWFwJywgZnVuY3Rpb24gKGQzU2VydiwgJHEpIHtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHNjb3BlOiB7fSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdGQzU2Vydi5kMygpLnRoZW4oZnVuY3Rpb24oZDMpIHtcblxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudFswXVxuXHRcdFx0XHR2YXIgd2lkdGggPSAxMDAwO1xuXHRcdFx0XHR2YXIgaGVpZ2h0ID0gNzAwO1xuXG5cdFx0XHRcdHZhciBzdmcgPSBkMy5zZWxlY3QoZWxlbWVudClcblx0XHRcdFx0XHRcdFx0LmFwcGVuZChcInN2Z1wiKVxuXHRcdFx0XHRcdFx0XHQuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuXHRcdFx0XHRcdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cblx0XHRcdFx0dmFyIHByb2plY3Rpb24gPSBkMy5nZW8ubWVyY2F0b3IoKVxuXHRcdFx0XHQgICAgXHRcdFx0LnNjYWxlKCh3aWR0aCArIDEpIC8gMiAvIE1hdGguUEkpXG5cdCAgICBcdFx0XHRcdFx0XHQudHJhbnNsYXRlKFt3aWR0aCAvIDIsIGhlaWdodCAvIDJdKVxuXHQgICAgXHRcdFx0XHRcdFx0LnByZWNpc2lvbiguMSlcblxuXHQgICAgXHRcdHZhciBwYXRoID0gZDMuZ2VvLnBhdGgoKVxuXHQgICAgXHRcdFx0XHRcdC5wcm9qZWN0aW9uKHByb2plY3Rpb24pXG5cblx0ICAgIFx0XHR2YXIgd29ybGRNYXAgPSBkMy5tYXAoe1xuXHQgICAgXHRcdH0pO1xuXG5cdCAgICBcdFx0ZDMuanNvbignd29ybGQuanNvbicsIGZ1bmN0aW9uIChlcnIsIGdsb2JlKXtcblx0XHRcdFx0XHR2YXIgd29ybGQgPSBzdmcuYXBwZW5kKCdnJylcblx0ICAgIFx0XHRcdFx0LmF0dHIoJ2NsYXNzJywgJ3dvcmxkJylcblx0ICAgIFx0XHRcdFx0LnNlbGVjdEFsbCgnZycpXG5cdCAgICBcdFx0XHRcdC5kYXRhKHRvcG9qc29uLmZlYXR1cmUoZ2xvYmUsIGdsb2JlLm9iamVjdHMuc3VidW5pdHMpLmZlYXR1cmVzKVxuXHQgICAgXHRcdFx0XHQuZW50ZXIoKVxuXHQgICAgXHRcdFx0XHQuYXBwZW5kKFwiZ1wiKVxuXHQgICAgXHRcdFx0XHRjb25zb2xlLmxvZyhnbG9iZS5vYmplY3RzKVxuXG5cdFx0ICAgIFx0XHRcdHdvcmxkLmFwcGVuZCgncGF0aCcpXG5cdFx0ICAgIFx0XHRcdFx0LmF0dHIoJ2QnLCBwYXRoKTtcblx0ICAgIFx0XHR9KVxuXG5cdCAgICBcdH0pXG5cblxuICAgIFx0XHQvLyBmdW5jdGlvbiBhc3luY2hMb2FkKGpzb25GaWxlKSB7XG4gICAgXHRcdC8vIFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKVxuICAgIFx0XHQvLyBcdGRlZmVycmVkLnJlc29sdmUoZDMuanNvbiwganNvbkZpbGUpXG4gICAgXHRcdC8vIFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgXHRcdC8vIH1cblxuICAgIFx0XHQvLyB2YXIgcHJvbWlzZSA9IGFzeW5jaExvYWQoJ3dvcmxkLmpzb24nKVxuICAgIFx0XHQvLyBcdHByb21pc2UudGhlbihmdW5jdGlvbiAoZXJyLCB3b3JsZCkge1xuICAgIFx0XHQvLyBcdFx0dmFyIHdvcmxkID0gc3ZnLmFwcGVuZCgnZycpXG5cdCAgICBcdC8vIFx0XHRcdC5hdHRyKCdjbGFzcycsICd3b3JsZCcpXG5cdCAgICBcdC8vIFx0XHRcdC5zZWxlY3RBbGwoJ2cnKVxuXHQgICAgXHQvLyBcdFx0XHQuZGF0YSh0b3BvanNvbi5mZWF0dXJlKHdvcmxkLCB3b3JsZC5vYmplY3RzLnN0YXRlcykpXG5cdCAgICBcdC8vIFx0XHRcdC5lbnRlcigpXG5cdCAgICBcdC8vIFx0XHRcdC5hcHBlbmQoXCJnXCIpXG5cblx0ICAgIFx0Ly8gXHRcdHdvcmQuYXBwZW5kKCdwYXRoJylcblx0ICAgIFx0Ly8gXHRcdFx0LmF0dHIoJ2QnLCBwYXRoKTtcblxuXHQgICAgXHQvLyBcdFx0JHNjb3BlLndvcmxkZGF0YSA9IHdvcmxkLm9iamVjdHNcbiAgICBcdFx0Ly8gXHR9KVxuXG5cblxuXHRcdH0gXG5cdH1cbn0pIl19
