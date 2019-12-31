const mongoclient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://localhost:27017";
const dbname = 'thebeast';
const dboper = require('./operation');

mongoclient.connect(url,(err,client) =>{
    assert.equal(err,null);
    console.log("Connected correctly to server");
const db = client.db(dbname);
const collection = db.collection('emp');

dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
collection, (result) => {
    console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, collection, (docs) => {
        console.log("Found Documents:\n", docs);

        dboper.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, collection,(result) => {
                console.log("Updated Document:\n", result.result);

                                dboper.findDocuments(db, collection, (docs) => {
                    console.log("Found Updated Documents:\n", docs);
                    
                                        db.dropCollection(collection, (result) => {
                        console.log("Dropped Collection: ", result);
                        client.close();
                    });
                });
            });
    });
});
 
    
});