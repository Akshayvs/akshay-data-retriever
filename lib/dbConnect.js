'use strict';
var couchbase = require('couchbase');
var restify= require ('restify');
var myCluster = new couchbase.Cluster('10.84.100.220');

var server = restify.createServer({});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());

server.on('uncaughtException', function(req, res, route, error) {
    return res.send(500, error);
});
server.get('/getDoc/:key',function (req, res, next) {

    var searchKey = req.params.key;
    var transform;
    var url=req.params.fieldsRequested; //string received
    console.log("TYPE OF URL= " + typeof url);

    if(url) {
        transform = url.split(','); //converted to array
    }
    console.log("TYPE OF TRANSFORM : " + typeof transform);


    console.log("KEY PROVIDED IS : " + searchKey + "\n");
    console.log("transform keys : " + req.params.fieldsRequested+ "\n");

    var searchCallback = function (err, cbDoc) {
        if (err) {
            console.log(err);
            res.send(404);
        }

        else {
                
            var type=typeof url;
            console.log( "\nVALEU OF \" type \" VAR :  " +typeof type);

            if ( url) {
                transformer(cbDoc, transform, Tcallback);
            }
            else{
                // Call to Transformer function to slice the Document
                res.send(200,cbDoc);

            }
        }
        next();
    }


        var Tcallback = function(err, finalDoc){
            if (err) {
                console.log(err);
                res.send(404);
            } else {
                res.send(200, finalDoc);

            }
        }

   search(searchKey,searchCallback);
   // res.send(200, cbDocTrans);
});

server.listen(2000);
//==========================================================================================================================================================
// CONNECTION TO THE BUCKET
var myBucket = myCluster.openBucket('presentation_assets','PassW0rd' , function(err) {
    if (err) {
        throw err;
    }
    else {
        console.log("\nCONNECTION SUCCESSFUL! \n")
        console.log("FOLLOW THE LINK TO SEARCH :  http://127.0.0.1:2000/getDoc/asset_-1464108288001_assetlite?fieldsRequested=assetGroup,assetTypeName,datePublished,ssts\n")
    }
});
//==========================================================================================================================================================
function search(searchKey, searchCallback) {
    var getCallback = function (err, res) {
        if (err) {
            throw err;
            console.log("INVALID KEY VALUE");
            searchCallback(err);
        }

        else {
            console.log("SearchFunction Executed : \n");
            console.log("DOCUMENT FOUND = : \n");
            var cbDoc = res.value;
            var cbDocTrans = JSON.stringify(cbDoc);
            searchCallback(null, cbDoc);
        }
    };

    myBucket.get(searchKey, getCallback);
}
function transformer(cbDoc,transform, Tcallback)
{
    console.log("TRANSFORMER FUNCTION RUNNING : \n ");
    //console.log("DOCUMENT received for transforming : \n" + JSON.stringify(cbDoc));
   // console.log("DOCUMENT received for transforming : \n" + cbDoc);
    console.log("\nTransformation parameters :\n" + transform);
    console.log("\n TRANSFORM ARRAY LENGTH:"+transform.length);

    var finalDoc={ };

    for (var i=0; i<transform.length; i+=1) {
        var temp = transform[i];

        var newDoc = cbDoc[temp]
        finalDoc[temp] = newDoc;

    }
        Tcallback(null, finalDoc);

}