const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var students = require('./students');
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'students'
// Create a new MongoClient
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
async function run() {
    try {
        await client.connect(); // Connect to the Server
        console.log("Connected successfully to server");
        // Code missing – se next slide
        const db = client.db(dbName);
        const collection = db.collection('student');
        // Insert some documents
        //let result = await collection.insertMany([{ "name": "Nikolaj", "grade": "12" }, { "name": "Thanh", "grade": "12" }, { "name": "Jonas", "grade": "12" }]);
        let result = await collection.insertMany(students);
        console.log("Inserted students!")
    } finally {
        await client.close();
    }
}
run(); 