# 🎉 FastMongo

FastMongo is a easy to use mongodb wrapper. Like quick.db.

---

## Features

- Supports full JSON paths.
- Easy to use.
- Uses collections and documents.

---

## Usage

> ```js
> const { createFastMongo } = require("fastmongo");
>
> (async () => {
>   const mongo = await createFastMongo("mongodb://localhost/FASTMONGO");
>
>   const myDB = await mongo.Database();
>   myDB.set("nice.data", 1243);
>   myDB.get("nice.data", "defaultValue");
>   myDB.has("nice.data");
>   // Converted normal value to array value here:
>   myDB.update("nice.data", (oldValue) => {
>     return [oldValue];
>   });
>   myDB.delete("nice.data");
>   // Soon: push, add, subtract
> })();
> ```

---

## API

> Coming Soon™️

---

> ##### Created By Kıraç Armağan Önal With ❤
