'use strict';

var fs = require('fs');
var restify = require('restify');
var url = require('url');


// only reason to bind routes like this instead of actually binding is so that the views can be tested
// without having to mock out the api


function bindRoutes(handlers, api)
{
// object.kys returns an array of given ob
    Object.keys(handlers).forEach(function bindRoute(path)
    {
        var routes = handlers[path];
        Object.keys(routes).forEach(function bindRouteMethod(method)
        {
            api[method](path, routes[method]);
        });
    });
}

2
function createServer()
{

    var server = restify.createServer({});
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.requestLogger());

    server.on('uncaughtException', function(req, res, route, error) {
        return res.send(500, error);
    });

    fs.readdirSync('./views').forEach(function loadView(viewFile)
        // call to the bindRoutes function
    {
        bindRoutes(require('./views/' + viewFile), server);
    });

    return server;
}
//call is made to create server function
var server = createServer();
server.listen(2000);