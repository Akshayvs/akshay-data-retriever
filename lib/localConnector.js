'use strict';
var couchbase = require('couchbase');
var myCluster = new couchbase.Cluster('127.0.0.1');
var readl = require('readline');
var rl = readl.createInterface({input: process.stdin, output: process.stdout});
var count =1; //used for iterating in the key input loop



// CONNECTION TO THE BUCKET
var myBucket = myCluster.openBucket('travel-sample',function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Connection Successful ! \n")
        search();
    }

    function search() {


        rl.question('please enter a key for searching ! \n', function (f) {
            console.log('VALUE ENTERED IS  :' + f);
            var key = f;

            myBucket.get(key, function (err, res) {

                if (err) {

                    while (count<4){
                           count=count+1;

                        console.log("INVALID KEY! ");

                        console.log("Attempt "+count+" of 4\n")
                        search();
                        // replace return with a break statement !

                        return
                    }
                    console.log("INVALID KEY! ");
                    console.log("Exiting");
                    process.exit(0);}


                // assign the retrieved json to a variable

                else {
                    var jsonTemp = res.value;
                    var jsonTransform= JSON.stringify(jsonTemp);
                    console.log("\nRetrieved Document:\n" + jsonTransform);//, res.value);

                }

                var keyOfKV="ssts";
                delete jsonTransform[keyOfKV];
                console.log("=============================================================================");
                console.log("MODIFIED DOCUMENT"+ jsonTransform);

            });


            //  process.exit(0);

        });
    }


});
