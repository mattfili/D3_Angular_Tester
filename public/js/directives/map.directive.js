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

				d3.json('mapdata/world.json', function (err, globe) {
					var world = svg.append('g').attr('class', 'world').selectAll('g').data(topojson.feature(globe, globe.objects.subunits).features).enter().append('g');

					console.log(globe.objects);

					world.append('path').attr('d', path);

					svg.selectAll('.subunit').data(topojson.feature(globe, globe.objects.countries).features).enter().append('path').attr('class', function (d) {
						return 'subunit ' + d.id;
					}).attr('d', path);

					var mArray = globe.objects.countries.geometries
					// mArray.map(function (element, id) {
					// 	var classID = element.id
					// 	console.log(classID)

					// })

					// world.append('path')
					// .datum(topojson.mesh(globe, globe.objects.subunits,
					// 	function(a,b) { return a !==b }))
					// 	.attr('class', 'borders')
					// 	.attr('d', path);
					;
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

// var classArray = ['.AFG', '.AGO', '.AIA', '.ALB', '.ALD', '.AND', '.ARE', '.ARG', '.ARM', '.ASM', '.ATA', '.ATF', '.ATG', '.AUS', '.AUT', '.AZE', '.BDI', '.BEL', '.BEN', '.BFA', '.BGD', '.BGR', '.BHR', '.BHS', '.BIH', '.BLM', '.BLR', '.BLZ', '.BMU', '.BOL', '.BRA', '.BRB', '.BRN', '.BTN', '.BWA', '.CAF', '.CAN', '.CHE', '.CHL', '.CHN', '.CIV', '.CMR', '.CNM', '.COD', '.COG', '.COK', '.COL', '.COM', '.CPV', '.CRI', '.CUB', '.CUW', '.CYM', '.CYN', '.CYP', '.CZE', '.DEU', '.DJI', '.DMA', '.DNK', '.DOM', '.DZA', '.ECU', '.EGY', '.ERI', '.ESB', '.ESP', '.EST', '.ETH', '.FIN', '.FJI', '.FLK', '.FRA', '.FRO', '.FSM', '.GAB', '.GBR', '.GEO', '.GGY', '.GHA', '.GIB', '.GIN', '.GMB', '.GNB', '.GNQ', '.GRC', '.GRD', '.GRL', '.GTM', '.GUM', '.GUY', '.HKG', '.HMD', '.HND', '.HRV', '.HTI', '.HUN', '.IDN', '.IMN', '.IND', '.IOA', '.IOT', '.IRL', '.IRN', '.IRQ', '.ISL', '.ISR', '.ITA', '.JAM', '.JEY', '.JOR', '.JPN', '.KAB', '.KAS', '.KAZ', '.KEN', '.KGZ', '.KHM', '.KIR', '.KNA', '.KOR', '.KOS', '.KWT', '.LAO', '.LBN', '.LBR', '.LBY', '.LCA', '.LIE', '.LKA', '.LSO', '.LTU', '.LUX', '.LVA', '.MAC', '.MAF', '.MAR', '.MCO', '.MDA', '.MDG', '.MDV', '.MEX', '.MHL', '.MKD', '.MLI', '.MLT', '.MMR', '.MNE', '.MNG', '.MNP', '.MOZ', '.MRT', '.MSR', '.MUS', '.MWI', '.MYS', '.NAM', '.NCL', '.NER', '.NFK', '.NGA', '.NIC', '.NIU', '.NLD', '.NOR', '.NPL', '.NRU', '.NZL', '.OMN', '.PAK', '.PAN', '.PCN', '.PER', '.PGA', '.PHL', '.PLW', '.PN1', '.POL', '.PRI', '.PRK', '.PR1', '.PRY', '.PSX', '.PYF', '.QAT', '.ROU', '.RUS', '.RWA', '.SAH', '.SAU', '.SDN', '.SDS', '.SEN', '.SGP', '.SGS', '.SHN', '.SLB', '.SLE', '.SLV', '.SMR', '.SOL', '.SOM', '.SPM', '.SRB', '.STP', '.SUR', '.SVK', '.SVN', '.SWE', '.SWZ', '.SXM', '.SYC', '.SYR', '.TCA', '.TCD', '.TGO', '.THA', '.TJK', '.TKM', '.TLS', '.TON', '.TTO', '.TUN', '.TUR', '.TUV', '.TWN', '.TZA', '.UGA', '.UKR', '.URY', '.USA', '.USG', '.UZB', '.VAT', '.VCT', '.VEN', '.VGB', '.VIR', '.VNM', '.VUT', '.WLF', '.WSB', '.WSM', '.YEM', '.ZAF', '.ZMB', '.ZWE']

// var fiveArrays = _.chunk(classArray, (classArray.length/4))
// fiveArrays[0].map(function (elem) {
//  		var stuff = elem + '{fill: ##e1f7d5}'
//  		console.log(stuff)
//  });
// fiveArrays[1].map(function (elem) {
//  		var stuff = elem + '{fill: #ffbdbd'
// 		console.log(stuff)
//  });
// 		fiveArrays[2].map(function (elem) {
// 		var stuff = elem + '{fill: #c9c9ff}'
// 		console.log(stuff)
//  });
// 		fiveArrays[3].map(function (elem) {
//  		var stuff = elem + '{fill: #ffffff}'
//  		console.log(stuff)
//  });
// 		fiveArrays[4].map(function (elem) {
//  		var stuff = elem + '{fill: #f1cbff}'
//  		console.log(stuff)
//  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9kaXJlY3RpdmVzL21hcC5kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBRU4sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7OztDQUdoQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQy9DLFVBQVMsU0FBUyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUU7QUFDbEMsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25CLFVBQVMsWUFBWSxHQUFHOztBQUV0QixZQUFVLENBQUMsTUFBTSxDQUFDLFlBQVc7QUFBRSxJQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUFFLENBQUMsQ0FBQztFQUN6RDs7OztBQUlELEtBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsVUFBUyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUNuQyxVQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUN2QixVQUFTLENBQUMsR0FBRyxHQUFHLDhCQUE4QixDQUFDO0FBQy9DLFVBQVMsQ0FBQyxrQkFBa0IsR0FBRyxZQUFZO0FBQ3pDLE1BQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUM7RUFDbkQsQ0FBQTtBQUNELFVBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDOztBQUVoQyxLQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsRUFBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFekIsUUFBTztBQUNMLElBQUUsRUFBRSxjQUFXO0FBQUUsVUFBTyxDQUFDLENB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ZmlsZSI6InNyYy9qcy9kaXJlY3RpdmVzL21hcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXG5cbi5tb2R1bGUoJ2QzJywgW10pXG5cbi8vLSBhc3N1cmVzIGQzIHdvcmtzIG9ubG9hZCBhbmQgYXN5bmNcbi5mYWN0b3J5KCdkM1NlcnYnLCBbJyRkb2N1bWVudCcsICckcScsICckcm9vdFNjb3BlJyxcbiAgICBmdW5jdGlvbigkZG9jdW1lbnQsICRxLCAkcm9vdFNjb3BlKSB7XG4gICAgICB2YXIgZCA9ICRxLmRlZmVyKCk7XG4gICAgICBmdW5jdGlvbiBvblNjcmlwdExvYWQoKSB7XG4gICAgICAgIC8vIExvYWQgY2xpZW50IGluIHRoZSBicm93c2VyXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkgeyBkLnJlc29sdmUod2luZG93LmQzKTsgfSk7XG4gICAgICB9XG4gICAgICAvLyBDcmVhdGUgYSBzY3JpcHQgdGFnIHdpdGggZDMgYXMgdGhlIHNvdXJjZVxuICAgICAgLy8gYW5kIGNhbGwgb3VyIG9uU2NyaXB0TG9hZCBjYWxsYmFjayB3aGVuIGl0XG4gICAgICAvLyBoYXMgYmVlbiBsb2FkZWRcbiAgICAgIHZhciBzY3JpcHRUYWcgPSAkZG9jdW1lbnRbMF0uY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHRUYWcudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBcbiAgICAgIHNjcmlwdFRhZy5hc3luYyA9IHRydWU7XG4gICAgICBzY3JpcHRUYWcuc3JjID0gJ2h0dHA6Ly9kM2pzLm9yZy9kMy52My5taW4uanMnO1xuICAgICAgc2NyaXB0VGFnLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBvblNjcmlwdExvYWQoKTtcbiAgICAgIH1cbiAgICAgIHNjcmlwdFRhZy5vbmxvYWQgPSBvblNjcmlwdExvYWQ7XG5cbiAgICAgIHZhciBzID0gJGRvY3VtZW50WzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICBzLmFwcGVuZENoaWxkKHNjcmlwdFRhZyk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGQzOiBmdW5jdGlvbigpIHsgcmV0dXJuIGQucHJvbWlzZTsgfVxuICAgICAgfTtcbn1dKTtcblxuYW5ndWxhclxuXG4ubW9kdWxlKCdNYXBEMycpXG5cbi5kaXJlY3RpdmUoJ21hcCcsIGZ1bmN0aW9uIChkM1NlcnYsICRxKSB7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRzY29wZToge30sXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0XHRkM1NlcnYuZDMoKS50aGVuKGZ1bmN0aW9uKGQzKSB7XG5cblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnRbMF1cblx0XHRcdFx0dmFyIHdpZHRoID0gMTAwMDtcblx0XHRcdFx0dmFyIGhlaWdodCA9IDcwMDtcblxuXHRcdFx0XHR2YXIgc3ZnID0gZDMuc2VsZWN0KGVsZW1lbnQpXG5cdFx0XHRcdFx0XHRcdC5hcHBlbmQoXCJzdmdcIilcblx0XHRcdFx0XHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcblx0XHRcdFx0XHRcdFx0LmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuXG5cdFx0XHRcdHZhciBwcm9qZWN0aW9uID0gZDMuZ2VvLm1lcmNhdG9yKClcblx0XHRcdFx0ICAgIFx0XHRcdC5zY2FsZSgod2lkdGggKyAxKSAvIDIgLyBNYXRoLlBJKVxuXHQgICAgXHRcdFx0XHRcdFx0LnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAyXSlcblx0ICAgIFx0XHRcdFx0XHRcdC5wcmVjaXNpb24oLjEpXG5cblx0ICAgIFx0XHR2YXIgcGF0aCA9IGQzLmdlby5wYXRoKClcblx0ICAgIFx0XHRcdFx0XHQucHJvamVjdGlvbihwcm9qZWN0aW9uKVxuXG5cdCAgICBcdFx0dmFyIHdvcmxkTWFwID0gZDMubWFwKHtcblx0ICAgIFx0XHR9KTtcblxuXHQgICAgXHRcdGQzLmpzb24oJ21hcGRhdGEvd29ybGQuanNvbicsIGZ1bmN0aW9uIChlcnIsIGdsb2JlKXtcblx0XHRcdFx0XHR2YXIgd29ybGQgPSBzdmcuYXBwZW5kKCdnJylcblx0XHRcdFx0XHRcdC5hdHRyKCdjbGFzcycsICd3b3JsZCcpXG5cdCAgICBcdFx0XHRcdC5zZWxlY3RBbGwoJ2cnKVxuXHQgICAgXHRcdFx0XHQuZGF0YSh0b3BvanNvbi5mZWF0dXJlKGdsb2JlLCBnbG9iZS5vYmplY3RzLnN1YnVuaXRzKS5mZWF0dXJlcylcblx0ICAgIFx0XHRcdFx0LmVudGVyKClcblx0ICAgIFx0XHRcdFx0LmFwcGVuZChcImdcIilcblxuXHQgICAgXHRcdFx0XHRjb25zb2xlLmxvZyhnbG9iZS5vYmplY3RzKVxuXG5cdFx0ICAgIFx0XHRcdHdvcmxkLmFwcGVuZCgncGF0aCcpXG5cdFx0ICAgIFx0XHRcdFx0LmF0dHIoJ2QnLCBwYXRoKTtcblxuXHRcdCAgICBcdFx0XHRzdmcuc2VsZWN0QWxsKCcuc3VidW5pdCcpXG5cdFx0ICAgIFx0XHRcdFx0LmRhdGEodG9wb2pzb24uZmVhdHVyZShnbG9iZSwgZ2xvYmUub2JqZWN0cy5jb3VudHJpZXMpLmZlYXR1cmVzKVxuXHRcdCAgICBcdFx0XHRcdC5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG5cdFx0ICAgIFx0XHRcdFx0LmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuICdzdWJ1bml0ICcgKyBkLmlkO30pXG5cdFx0ICAgIFx0XHRcdFx0LmF0dHIoJ2QnLCBwYXRoKVxuXG5cdFx0ICAgIFx0XHRcdFx0dmFyIG1BcnJheSA9IGdsb2JlLm9iamVjdHMuY291bnRyaWVzLmdlb21ldHJpZXNcblx0XHQgICAgXHRcdFx0XHQvLyBtQXJyYXkubWFwKGZ1bmN0aW9uIChlbGVtZW50LCBpZCkge1xuXHRcdCAgICBcdFx0XHRcdC8vIFx0dmFyIGNsYXNzSUQgPSBlbGVtZW50LmlkXG5cdFx0ICAgIFx0XHRcdFx0Ly8gXHRjb25zb2xlLmxvZyhjbGFzc0lEKVxuXG5cdFx0ICAgIFx0XHRcdFx0Ly8gfSlcblxuXHRcdCAgICBcdFx0XHQvLyB3b3JsZC5hcHBlbmQoJ3BhdGgnKVxuXHRcdCAgICBcdFx0XHQvLyAuZGF0dW0odG9wb2pzb24ubWVzaChnbG9iZSwgZ2xvYmUub2JqZWN0cy5zdWJ1bml0cywgXG5cdFx0ICAgIFx0XHRcdC8vIFx0ZnVuY3Rpb24oYSxiKSB7IHJldHVybiBhICE9PWIgfSkpXG5cdFx0ICAgIFx0XHRcdC8vIFx0LmF0dHIoJ2NsYXNzJywgJ2JvcmRlcnMnKVxuXHRcdCAgICBcdFx0XHQvLyBcdC5hdHRyKCdkJywgcGF0aCk7XG5cdCAgICBcdFx0fSlcblxuXHQgICAgXHR9KVxuXHRcdFxuXG5cbiAgICBcdFx0Ly8gZnVuY3Rpb24gYXN5bmNoTG9hZChqc29uRmlsZSkge1xuICAgIFx0XHQvLyBcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKClcbiAgICBcdFx0Ly8gXHRkZWZlcnJlZC5yZXNvbHZlKGQzLmpzb24sIGpzb25GaWxlKVxuICAgIFx0XHQvLyBcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIFx0XHQvLyB9XG5cbiAgICBcdFx0Ly8gdmFyIHByb21pc2UgPSBhc3luY2hMb2FkKCd3b3JsZC5qc29uJylcbiAgICBcdFx0Ly8gXHRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGVyciwgd29ybGQpIHtcbiAgICBcdFx0Ly8gXHRcdHZhciB3b3JsZCA9IHN2Zy5hcHBlbmQoJ2cnKVxuXHQgICAgXHQvLyBcdFx0XHQuYXR0cignY2xhc3MnLCAnd29ybGQnKVxuXHQgICAgXHQvLyBcdFx0XHQuc2VsZWN0QWxsKCdnJylcblx0ICAgIFx0Ly8gXHRcdFx0LmRhdGEodG9wb2pzb24uZmVhdHVyZSh3b3JsZCwgd29ybGQub2JqZWN0cy5zdGF0ZXMpKVxuXHQgICAgXHQvLyBcdFx0XHQuZW50ZXIoKVxuXHQgICAgXHQvLyBcdFx0XHQuYXBwZW5kKFwiZ1wiKVxuXG5cdCAgICBcdC8vIFx0XHR3b3JkLmFwcGVuZCgncGF0aCcpXG5cdCAgICBcdC8vIFx0XHRcdC5hdHRyKCdkJywgcGF0aCk7XG5cblx0ICAgIFx0Ly8gXHRcdCRzY29wZS53b3JsZGRhdGEgPSB3b3JsZC5vYmplY3RzXG4gICAgXHRcdC8vIFx0fSlcblxuXG5cdFx0XHRcdCAvLyB2YXIgY2xhc3NBcnJheSA9IFsnLkFGRycsICcuQUdPJywgJy5BSUEnLCAnLkFMQicsICcuQUxEJywgJy5BTkQnLCAnLkFSRScsICcuQVJHJywgJy5BUk0nLCAnLkFTTScsICcuQVRBJywgJy5BVEYnLCAnLkFURycsICcuQVVTJywgJy5BVVQnLCAnLkFaRScsICcuQkRJJywgJy5CRUwnLCAnLkJFTicsICcuQkZBJywgJy5CR0QnLCAnLkJHUicsICcuQkhSJywgJy5CSFMnLCAnLkJJSCcsICcuQkxNJywgJy5CTFInLCAnLkJMWicsICcuQk1VJywgJy5CT0wnLCAnLkJSQScsICcuQlJCJywgJy5CUk4nLCAnLkJUTicsICcuQldBJywgJy5DQUYnLCAnLkNBTicsICcuQ0hFJywgJy5DSEwnLCAnLkNITicsICcuQ0lWJywgJy5DTVInLCAnLkNOTScsICcuQ09EJywgJy5DT0cnLCAnLkNPSycsICcuQ09MJywgJy5DT00nLCAnLkNQVicsICcuQ1JJJywgJy5DVUInLCAnLkNVVycsICcuQ1lNJywgJy5DWU4nLCAnLkNZUCcsICcuQ1pFJywgJy5ERVUnLCAnLkRKSScsICcuRE1BJywgJy5ETksnLCAnLkRPTScsICcuRFpBJywgJy5FQ1UnLCAnLkVHWScsICcuRVJJJywgJy5FU0InLCAnLkVTUCcsICcuRVNUJywgJy5FVEgnLCAnLkZJTicsICcuRkpJJywgJy5GTEsnLCAnLkZSQScsICcuRlJPJywgJy5GU00nLCAnLkdBQicsICcuR0JSJywgJy5HRU8nLCAnLkdHWScsICcuR0hBJywgJy5HSUInLCAnLkdJTicsICcuR01CJywgJy5HTkInLCAnLkdOUScsICcuR1JDJywgJy5HUkQnLCAnLkdSTCcsICcuR1RNJywgJy5HVU0nLCAnLkdVWScsICcuSEtHJywgJy5ITUQnLCAnLkhORCcsICcuSFJWJywgJy5IVEknLCAnLkhVTicsICcuSUROJywgJy5JTU4nLCAnLklORCcsICcuSU9BJywgJy5JT1QnLCAnLklSTCcsICcuSVJOJywgJy5JUlEnLCAnLklTTCcsICcuSVNSJywgJy5JVEEnLCAnLkpBTScsICcuSkVZJywgJy5KT1InLCAnLkpQTicsICcuS0FCJywgJy5LQVMnLCAnLktBWicsICcuS0VOJywgJy5LR1onLCAnLktITScsICcuS0lSJywgJy5LTkEnLCAnLktPUicsICcuS09TJywgJy5LV1QnLCAnLkxBTycsICcuTEJOJywgJy5MQlInLCAnLkxCWScsICcuTENBJywgJy5MSUUnLCAnLkxLQScsICcuTFNPJywgJy5MVFUnLCAnLkxVWCcsICcuTFZBJywgJy5NQUMnLCAnLk1BRicsICcuTUFSJywgJy5NQ08nLCAnLk1EQScsICcuTURHJywgJy5NRFYnLCAnLk1FWCcsICcuTUhMJywgJy5NS0QnLCAnLk1MSScsICcuTUxUJywgJy5NTVInLCAnLk1ORScsICcuTU5HJywgJy5NTlAnLCAnLk1PWicsICcuTVJUJywgJy5NU1InLCAnLk1VUycsICcuTVdJJywgJy5NWVMnLCAnLk5BTScsICcuTkNMJywgJy5ORVInLCAnLk5GSycsICcuTkdBJywgJy5OSUMnLCAnLk5JVScsICcuTkxEJywgJy5OT1InLCAnLk5QTCcsICcuTlJVJywgJy5OWkwnLCAnLk9NTicsICcuUEFLJywgJy5QQU4nLCAnLlBDTicsICcuUEVSJywgJy5QR0EnLCAnLlBITCcsICcuUExXJywgJy5QTjEnLCAnLlBPTCcsICcuUFJJJywgJy5QUksnLCAnLlBSMScsICcuUFJZJywgJy5QU1gnLCAnLlBZRicsICcuUUFUJywgJy5ST1UnLCAnLlJVUycsICcuUldBJywgJy5TQUgnLCAnLlNBVScsICcuU0ROJywgJy5TRFMnLCAnLlNFTicsICcuU0dQJywgJy5TR1MnLCAnLlNITicsICcuU0xCJywgJy5TTEUnLCAnLlNMVicsICcuU01SJywgJy5TT0wnLCAnLlNPTScsICcuU1BNJywgJy5TUkInLCAnLlNUUCcsICcuU1VSJywgJy5TVksnLCAnLlNWTicsICcuU1dFJywgJy5TV1onLCAnLlNYTScsICcuU1lDJywgJy5TWVInLCAnLlRDQScsICcuVENEJywgJy5UR08nLCAnLlRIQScsICcuVEpLJywgJy5US00nLCAnLlRMUycsICcuVE9OJywgJy5UVE8nLCAnLlRVTicsICcuVFVSJywgJy5UVVYnLCAnLlRXTicsICcuVFpBJywgJy5VR0EnLCAnLlVLUicsICcuVVJZJywgJy5VU0EnLCAnLlVTRycsICcuVVpCJywgJy5WQVQnLCAnLlZDVCcsICcuVkVOJywgJy5WR0InLCAnLlZJUicsICcuVk5NJywgJy5WVVQnLCAnLldMRicsICcuV1NCJywgJy5XU00nLCAnLllFTScsICcuWkFGJywgJy5aTUInLCAnLlpXRSddXG5cblx0XHRcdFx0IC8vIHZhciBmaXZlQXJyYXlzID0gXy5jaHVuayhjbGFzc0FycmF5LCAoY2xhc3NBcnJheS5sZW5ndGgvNCkpXG5cdFx0XHRcdFx0Ly8gZml2ZUFycmF5c1swXS5tYXAoZnVuY3Rpb24gKGVsZW0pIHtcblx0XHRcdFx0XHQvLyAgXHRcdHZhciBzdHVmZiA9IGVsZW0gKyAne2ZpbGw6ICMjZTFmN2Q1fSdcblx0XHRcdFx0XHQvLyAgXHRcdGNvbnNvbGUubG9nKHN0dWZmKVxuXHRcdFx0XHRcdC8vICB9KTtcblx0XHRcdFx0XHQvLyBmaXZlQXJyYXlzWzFdLm1hcChmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0XHRcdC8vICBcdFx0dmFyIHN0dWZmID0gZWxlbSArICd7ZmlsbDogI2ZmYmRiZCdcblx0XHRcdFx0XHQvLyBcdFx0Y29uc29sZS5sb2coc3R1ZmYpXG5cdFx0XHRcdFx0Ly8gIH0pO1xuXHRcdFx0XHRcdC8vIFx0XHRmaXZlQXJyYXlzWzJdLm1hcChmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0XHRcdC8vIFx0XHR2YXIgc3R1ZmYgPSBlbGVtICsgJ3tmaWxsOiAjYzljOWZmfSdcblx0XHRcdFx0XHQvLyBcdFx0Y29uc29sZS5sb2coc3R1ZmYpXG5cdFx0XHRcdFx0Ly8gIH0pO1xuXHRcdFx0XHRcdC8vIFx0XHRmaXZlQXJyYXlzWzNdLm1hcChmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0XHRcdC8vICBcdFx0dmFyIHN0dWZmID0gZWxlbSArICd7ZmlsbDogI2ZmZmZmZn0nXG5cdFx0XHRcdFx0Ly8gIFx0XHRjb25zb2xlLmxvZyhzdHVmZilcblx0XHRcdFx0XHQvLyAgfSk7XG5cdFx0XHRcdFx0Ly8gXHRcdGZpdmVBcnJheXNbNF0ubWFwKGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0XHRcdFx0Ly8gIFx0XHR2YXIgc3R1ZmYgPSBlbGVtICsgJ3tmaWxsOiAjZjFjYmZmfSdcblx0XHRcdFx0XHQvLyAgXHRcdGNvbnNvbGUubG9nKHN0dWZmKVxuXHRcdFx0XHRcdC8vICB9KTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcblx0XHRcdH1cblx0fVxufSkiXX0=
