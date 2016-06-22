'use strict';
var couchbase = require('couchbase');
var restify= require ('restify');
var myCluster = new couchbase.Cluster('10.84.100.220');


var server = restify.createServer({});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.listen(8080);


server.get('/hello/:KEY',function(req, res, next){
// http://127.0.0.1:8080/hello/ASD123?name[0]=Actor1&name[1]=Actor2&name[2]=Actor3
    // store in an array
    //console.log(req);

    console.log(req.query.name[1]);
    
    next();



});