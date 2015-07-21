angular

.module('d3', [])

//- assures d3 works onload and async
.factory('d3Serv', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve(window.d3); });
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
      }
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
}]);

angular

.module('MapD3')

.directive('map', function (d3Serv, $q) {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, element, attrs) {
			d3Serv.d3().then(function(d3) {

				element = element[0]
				var width = 1000;
				var height = 700;
				var color = d3.scale.category20()

				var svg = d3.select(element)
							.append("svg")
							.attr("width", width)
							.attr("height", height)

				var projection = d3.geo.mercator()
				    			.scale((width + 1) / 2 / Math.PI)
	    						.translate([width / 2, height / 2])
	    						.precision(.1)

	    		var path = d3.geo.path()
	    					.projection(projection)


	    		d3.json('mapdata/world.json', function (err, globe){
	    			var neighbors = topojson.neighbors(globe.objects.countries.geometries)
	    			var countries = topojson.feature(globe, globe.objects.countries).features

	    			svg.selectAll(".country")
				    .data(countries)
				    .enter().insert("path")
			    	.attr("class", "country")
			    	.attr("d", path)
			    	.style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); });

				  	svg.insert("path")
				    .datum(topojson.mesh(globe, globe.objects.countries, function(a, b) { return a !== b; }))
				    .attr("class", "boundary")
				    .attr("d", path);







					
					// var world = svg.append('g')
	    // 				.selectAll('g')
	    // 				.data(topojson.feature(globe, globe.objects.subunits).features)
	    // 				.enter()
	    // 				.append("g")

	    // 				console.log(globe.objects)

		   //  			world.append('path')
		   //  				.attr('class', 'world')
		   //  				.attr('d', path);

		   //  			svg.append('path')
		   //  				.datum(topojson.mesh(globe, globe.objects.subunits), function(a,b) {return a!==b})
		   //  				.attr('d', path)
		   //  				.attr('class', 'subunit-boundary')

		    			
	    		})

	    	})
		


    		
							
						
			}
	}
})