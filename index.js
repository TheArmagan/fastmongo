const { CollectionManager } = require("./src/CollectionManager");
const { DocumentManager } = require("./src/DocumentManager");
const { createFastMongo } = require("./src/createFastMongo");

module.exports = { CollectionManager, DocumentManager, createFastMongo };