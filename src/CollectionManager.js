const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const { DocumentManager } = require("./DocumentManager");

class CollectionManager {

    /** @type {MongoClient} */
    #mongoClient;

    /** @type {mongodb.Collection} */
    #mainCollection;

    /** @type {Map<string, DocumentManager>} */
    #documentManagers;

    /** @type {Boolean} */
    #destroyed = false;

    constructor() {
        this.#documentManagers = new Map();
    }

    /**
     * @param {String} URI 
     * @param {String} collectionName
     * @param {mongodb.MongoClientOptions} mongoClientOptions
     */
    async init(URI, collectionName = "FASTMONGO", mongoClientOptions = {}) {
        if (this.#destroyed) throw "Collection manager is destroyed!";
        this.#mongoClient = new MongoClient(URI, { useUnifiedTopology: true, ...mongoClientOptions });
        await this.#mongoClient.connect();
        this.#mainCollection = this.#mongoClient.db().collection(collectionName);
        await this.#mainCollection.createIndex({
            name: "text"
        });
        return;
    }

    get mongoClient() {
        return this.#mongoClient;
    }

    get mainCollection() {
        return this.#mainCollection;
    }

    /**
     * @param {String} name 
     */
    async Database(name = "FASTMONGO") {

        if (this.#documentManagers.has(name)) {
            return this.#documentManagers.get(name);
        }

        let document = await this.#mainCollection.findOne({
            $text: { $search: name, $caseSensitive: true }
        });

        if (!document) {
            document = await this.#mainCollection.insertOne({
                name: name,
                json: {}
            })
        }

        let manager = new DocumentManager(this.#mainCollection, name);
        this.#documentManagers.set(name, manager);

        return manager;

    }

    /**
     * @param {String} name
     */
    async deleteDatabase(name) {
        let result = await this.#mainCollection.deleteOne({ name });
        return Boolean(result?.result?.ok);
    }

    get destroyed() {
        return this.#destroyed;
    }

    async destroy() {
        if (this.#destroyed) throw "Collection manager is already destroyed!";
        await this.#mongoClient.close(true);
        this.#documentManagers = 0;
        this.#mainCollection = 0;
        this.#mongoClient = 0;
        this.Database = 0;
    }
}



module.exports = { CollectionManager };
