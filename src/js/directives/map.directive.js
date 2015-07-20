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

.directive('map', function (d3Serv) {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, element, attrs) {
			d3Serv.d3().then(function(d3) {

			var width = 1000;
			var height = 700;

			var svg = d3.select(element[0])
						.append("svg")
						.attr("width", width)
						attr("height", height)

			var projection = d3.geo.mercator()
			    			.scale((width + 1) / 2 / Math.PI)
    						.translate([width / 2, height / 2])
    						.precision(.1)

    		var path = d3.geo.path()
    					.projection(projection)

    		var worldMap = d3.map({
    		});

    		queue()
    			.defer(d3.json, 'mapdata/world.json')
    			.await(function (err, world) {
    				var world = svg.append('g')
	    				.attr("class", 'states')
	    				.selectAll('g')
	    				.data(topojson.feature(world, world.objects.states))
	    				.enter()
	    				.append("g")

	    			word.append('path')
	    				.attr('d', path);
    			})


			})


		}


	}




})