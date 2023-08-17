const {MongoClient} = require('mongodb');
const uri = "mongodb://0.0.0.0:27017";
const database = "sample";
const client= new MongoClient(uri);
const dbConnect = async () => {
    const result = await client.connect();
    const db = await result.db(database);
    return db.collection("student");

}
module.exports = dbConnect;