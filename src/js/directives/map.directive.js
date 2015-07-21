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

	    		var worldMap = d3.map({
	    		});

	    		d3.json('mapdata/world.json', function (err, globe){
					var world = svg.append('g')
						.attr('class', 'world')
	    				.selectAll('g')
	    				.data(topojson.feature(globe, globe.objects.subunits).features)
	    				.enter()
	    				.append("g")

	    				console.log(globe.objects)

		    			world.append('path')
		    				.attr('d', path);

		    			svg.selectAll('.subunit')
		    				.data(topojson.feature(globe, globe.objects.countries).features)
		    				.enter().append('path')
		    				.attr('class', function (d) { return 'subunit ' + d.id;})
		    				.attr('d', path)

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
	    		})

	    	})
		


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
							
						
			}
	}
})