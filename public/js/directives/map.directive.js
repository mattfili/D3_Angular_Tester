'use strict';

angular.module('d3', [])

//- Injects D3 as a Service
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
				var width = 900;
				var height = 700;
				var color = d3.scale.category20();

				var svg = d3.select(element).append('svg').attr('width', width).attr('height', height);

				var projection = d3.geo.mercator().scale((width + 1) / 2 / Math.PI).translate([width / 2, height / 2]).precision(.1);

				var path = d3.geo.path().projection(projection);

				d3.json('mapdata/world.json', function (err, globe) {
					var neighbors = topojson.neighbors(globe.objects.countries.geometries);
					var countries = topojson.feature(globe, globe.objects.countries).features;

					svg.selectAll('.country').data(countries).enter().insert('path').attr('class', 'country').attr('d', path).style('fill', function (d, i) {
						return color(d.color = d3.max(neighbors[i], function (n) {
							return countries[n].color;
						}) + 1 | 0);
					});

					svg.insert('path').datum(topojson.mesh(globe, globe.objects.countries, function (a, b) {
						return a !== b;
					})).attr('class', 'boundary').attr('d', path);
				});
			});
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9kaXJlY3RpdmVzL21hcC5kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBRU4sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7OztDQUdoQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQy9DLFVBQVMsU0FBUyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUU7QUFDbEMsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25CLFVBQVMsWUFBWSxHQUFHOztBQUV0QixZQUFVLENBQUMsTUFBTSxDQUFDLFlBQVc7QUFBRSxJQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUFFLENBQUMsQ0FBQztFQUN6RDs7OztBQUlELEtBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsVUFBUyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUNuQyxVQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUN2QixVQUFTLENBQUMsR0FBRyxHQUFHLDhCQUE4QixDQUFDO0FBQy9DLFVBQVMsQ0FBQyxrQkFBa0IsR0FBRyxZQUFZO0FBQ3pDLE1BQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUM7RUFDbkQsQ0FBQTtBQUNELFVBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDOztBQUVoQyxLQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsRUFBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFekIsUUFBTztBQUNMLElBQUUsRUFBRSxjQUFXO0FBQUUsVUFBTyxDQUFDLENB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QUFDLENBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FHakIsQ0FBQyxDQUFBO0lBRUYsQ0FBQyxDQUFBO0dBRUw7RUFDRCxDQUFBO0NBQ0QsQ0FBQyxDQUFBIiwiZmlsZSI6InNyYy9qcy9kaXJlY3RpdmVzL21hcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXG5cbi5tb2R1bGUoJ2QzJywgW10pXG5cbi8vLSBJbmplY3RzIEQzIGFzIGEgU2VydmljZVxuLmZhY3RvcnkoJ2QzU2VydicsIFsnJGRvY3VtZW50JywgJyRxJywgJyRyb290U2NvcGUnLFxuICAgIGZ1bmN0aW9uKCRkb2N1bWVudCwgJHEsICRyb290U2NvcGUpIHtcbiAgICAgIHZhciBkID0gJHEuZGVmZXIoKTtcbiAgICAgIGZ1bmN0aW9uIG9uU2NyaXB0TG9hZCgpIHtcbiAgICAgICAgLy8gTG9hZCBjbGllbnQgaW4gdGhlIGJyb3dzZXJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7IGQucmVzb2x2ZSh3aW5kb3cuZDMpOyB9KTtcbiAgICAgIH1cbiAgICAgIC8vIENyZWF0ZSBhIHNjcmlwdCB0YWcgd2l0aCBkMyBhcyB0aGUgc291cmNlXG4gICAgICAvLyBhbmQgY2FsbCBvdXIgb25TY3JpcHRMb2FkIGNhbGxiYWNrIHdoZW4gaXRcbiAgICAgIC8vIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgdmFyIHNjcmlwdFRhZyA9ICRkb2N1bWVudFswXS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdFRhZy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IFxuICAgICAgc2NyaXB0VGFnLmFzeW5jID0gdHJ1ZTtcbiAgICAgIHNjcmlwdFRhZy5zcmMgPSAnaHR0cDovL2QzanMub3JnL2QzLnYzLm1pbi5qcyc7XG4gICAgICBzY3JpcHRUYWcub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIG9uU2NyaXB0TG9hZCgpO1xuICAgICAgfVxuICAgICAgc2NyaXB0VGFnLm9ubG9hZCA9IG9uU2NyaXB0TG9hZDtcblxuICAgICAgdmFyIHMgPSAkZG9jdW1lbnRbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICAgIHMuYXBwZW5kQ2hpbGQoc2NyaXB0VGFnKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZDM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZC5wcm9taXNlOyB9XG4gICAgICB9O1xufV0pO1xuXG5hbmd1bGFyXG5cbi5tb2R1bGUoJ01hcEQzJylcblxuLmRpcmVjdGl2ZSgnbWFwJywgZnVuY3Rpb24gKGQzU2VydiwgJHEpIHtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHNjb3BlOiB7fSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdGQzU2Vydi5kMygpLnRoZW4oZnVuY3Rpb24oZDMpIHtcblxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudFswXVxuXHRcdFx0XHR2YXIgd2lkdGggPSA5MDA7XG5cdFx0XHRcdHZhciBoZWlnaHQgPSA3MDA7XG5cdFx0XHRcdHZhciBjb2xvciA9IGQzLnNjYWxlLmNhdGVnb3J5MjAoKVxuXG5cdFx0XHRcdHZhciBzdmcgPSBkMy5zZWxlY3QoZWxlbWVudClcblx0XHRcdFx0XHRcdFx0LmFwcGVuZChcInN2Z1wiKVxuXHRcdFx0XHRcdFx0XHQuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuXHRcdFx0XHRcdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cblx0XHRcdFx0dmFyIHByb2plY3Rpb24gPSBkMy5nZW8ubWVyY2F0b3IoKVxuXHRcdFx0XHQgICAgXHRcdFx0LnNjYWxlKCh3aWR0aCArIDEpIC8gMiAvIE1hdGguUEkpXG5cdCAgICBcdFx0XHRcdFx0XHQudHJhbnNsYXRlKFt3aWR0aCAvIDIsIGhlaWdodCAvIDJdKVxuXHQgICAgXHRcdFx0XHRcdFx0LnByZWNpc2lvbiguMSlcblxuXHQgICAgXHRcdHZhciBwYXRoID0gZDMuZ2VvLnBhdGgoKVxuXHQgICAgXHRcdFx0XHRcdC5wcm9qZWN0aW9uKHByb2plY3Rpb24pXG5cblxuXHQgICAgXHRcdGQzLmpzb24oJ21hcGRhdGEvd29ybGQuanNvbicsIGZ1bmN0aW9uIChlcnIsIGdsb2JlKXtcblx0ICAgIFx0XHRcdHZhciBuZWlnaGJvcnMgPSB0b3BvanNvbi5uZWlnaGJvcnMoZ2xvYmUub2JqZWN0cy5jb3VudHJpZXMuZ2VvbWV0cmllcylcblx0ICAgIFx0XHRcdHZhciBjb3VudHJpZXMgPSB0b3BvanNvbi5mZWF0dXJlKGdsb2JlLCBnbG9iZS5vYmplY3RzLmNvdW50cmllcykuZmVhdHVyZXNcblxuXHQgICAgXHRcdFx0c3ZnLnNlbGVjdEFsbChcIi5jb3VudHJ5XCIpXG5cdFx0XHRcdCAgICAuZGF0YShjb3VudHJpZXMpXG5cdFx0XHRcdCAgICAuZW50ZXIoKS5pbnNlcnQoXCJwYXRoXCIpXG5cdFx0XHQgICAgXHQuYXR0cihcImNsYXNzXCIsIFwiY291bnRyeVwiKVxuXHRcdFx0ICAgIFx0LmF0dHIoXCJkXCIsIHBhdGgpXG5cdFx0XHQgICAgXHQuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIGNvbG9yKGQuY29sb3IgPSBkMy5tYXgobmVpZ2hib3JzW2ldLCBmdW5jdGlvbihuKSB7IHJldHVybiBjb3VudHJpZXNbbl0uY29sb3I7IH0pICsgMSB8IDApOyB9KTtcblxuXHRcdFx0XHQgIFx0c3ZnLmluc2VydChcInBhdGhcIilcblx0XHRcdFx0ICAgIC5kYXR1bSh0b3BvanNvbi5tZXNoKGdsb2JlLCBnbG9iZS5vYmplY3RzLmNvdW50cmllcywgZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYSAhPT0gYjsgfSkpXG5cdFx0XHRcdCAgICAuYXR0cihcImNsYXNzXCIsIFwiYm91bmRhcnlcIilcblx0XHRcdFx0ICAgIC5hdHRyKFwiZFwiLCBwYXRoKTtcblxuXHRcdCAgICBcdFx0XHRcblx0ICAgIFx0XHR9KVxuXG5cdCAgICBcdH0pXG5cdFx0XHRcblx0XHR9XG5cdH1cbn0pIl19
