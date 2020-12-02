const { createFastMongo } = require("./src/CollectionManager");

(async () => {

    console.log("Start");
    const mongo = await createFastMongo("mongodb://127.0.0.1/fastmongo");
    console.log("Mongo created");

    const myDB = await mongo.Database("test");
    console.log("database created");

    await myDB.set("is.this.a.successful['test?']", true);
    console.log("set successful");

    let getted = await myDB.get("is.this.a.successful['test']", "nice");
    console.log({ getted })

    mongo.destroy();
})();