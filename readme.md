# 🎉 FastMongo

FastMongo is a easy to use mongodb wrapper. Like quick.db.

---

## Features

- Supports full JSON paths.
- Easy to use.
- Uses collections and documents.

---

## Usage

```js
const { createFastMongo } = require("fastmongo");

(async () => {
  const mongo = await createFastMongo("mongodb://calhost/FASTMONGO");

  const myDB = await mongo.Database();
  myDB.set("nice.data", 1243);
  myDB.get("nice.data", "defaultValue");
  myDB.has("nice.data");
  myDB.update("nice.data", (oldValue) => {
    return [oldValue];
  });
  myDB.delete("nice.data");
})();
```

---

## API

> Coming Soon™️

---

## TODO

- [✔](https://example.com "Done in version 0.0.2!") ~~`db.add(), db.subtract(), db.push(), db.shift()`~~
- [❌](https://example.com "Not done yet..") `Cache System`
- [❌](https://example.com "Not done yet..") `Better Data Fetching System`

---

> ##### Created By Kıraç Armağan Önal With ❤

---
