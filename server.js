var Hapi = require("hapi");
	var serverArgs = {
			port: '9988'
	};
	var server = new Hapi.Server({
		connections: {
			router: {
			  stripTrailingSlash: true
			}
		},
		debug: {request: ['info', 'error']}
	});
	server.connection(serverArgs);
	    
	    server.route({
	    	method : 'GET',
	    	path : '/xmllint',
	    	handler : function (request, reply) {
	    		var appRoot = require('app-root-path');
	    		var fs = require('fs');
	    		var xml1 = fs.readFileSync(appRoot + '/data/books.xml');
	    		var xsd1 = fs.readFileSync(appRoot + '/data/books.xsd');
	    		var xmllint = require('xmllint');
	    		var result = xmllint.validateXML({ xml: xml1, schema: xsd1} );

	    		reply("result: " + JSON.stringify(result));
	    	}
	    });
		
		server.route({
	    	method : 'GET',
	    	path : '/getDate',
	    	handler : function (request, reply) {
	    		reply("Date: " + new Date());
	    	}
	    });
	
	server.start( function (err){
		if(err) throw err;
		console.log("server listening at :" + server.info.uri);
		
		server.table().forEach(function(route) {
			route.table.forEach(function(ep){
				/*logger.info*/console.log(ep.path, '\t', ep.method.toUpperCase());
			});
		});
	});