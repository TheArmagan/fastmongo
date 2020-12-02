const { CollectionManager } = require("./CollectionManager");
const mongodb = require("mongodb");

/**
 * @param {String} URI 
 * @param {String} collectionName
 * @param {mongodb.MongoClientOptions} mongoClientOptions
 * 
 * @returns {Promise<CollectionManager>}
 */
async function createFastMongo(URI, collectionName = "FASTMONGO", mongoClientOptions = {}) {
    let mongo = new CollectionManager();
    await mongo.init(URI, collectionName, mongoClientOptions);
    return mongo;
}