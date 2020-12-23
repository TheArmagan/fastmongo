const mongodb = require("mongodb");
const lodash = require("lodash");
const { isNull } = require("lodash");

class DocumentManager {

    /** @type {mongodb.Collection} */
    #collection;

    /** @type {String} */
    #name;

    /**
     * @param {mongodb.Collection} collection
     * @param {String} name
     */
    constructor(collection, name) {
        this.#collection = collection;
        this.#name = name;
    }

    get collection() {
        return this.#collection;
    }

    get name() {
        return this.#name;
    }

    async _getRawData() {
        let result = await this.#collection.findOne({ name: this.#name });
        return result.json;
    }

    async _setRawData(json) {
        await this.#collection.findOneAndUpdate({ name: this.#name }, { $set: { json } });
        return json;
    }

    /**
     * @param {String} dataPath 
     * @param {any} defaultValue 
     */
    async get(dataPath, defaultValue) {
        let rawData = await this._getRawData();
        let result = lodash.get(rawData, dataPath);
        if (typeof result == "undefined") {
            let newData = lodash.set(rawData, dataPath, defaultValue);
            await this._setRawData(newData);
            result = defaultValue;
        }
        return result;
    }

    /**
     * @param {String} dataPath 
     * @param {any} newValue
     */
    async set(dataPath, newValue) {
        let rawData = await this._getRawData();
        let newData = lodash.set(rawData, dataPath, newValue);
        await this._setRawData(newData);
        return newData;
    }

    /**
     * @param {String} dataPath 
     * @param {(value: any) => any} updater
     */
    async update(dataPath, updater) {
        let rawData = await this._getRawData();
        let newData = lodash.update(rawData, dataPath, updater);
        await this._setRawData(rawData);
        return newData;
    }

    /**
     * @param {String} dataPath 
     * @returns {Boolean} Returns true when is process successful
     */
    async delete(dataPath) {
        let rawData = await this._getRawData();
        let isSuccessful = await lodash.unset(rawData, dataPath); // Modifies the original object.
        await this._setRawData(rawData);
        return isSuccessful;
    }

    /**
     * @param {String} dataPath
     * @returns {Boolean}
     */
    async has(dataPath) {
        let rawData = await this._getRawData();
        let isFound = await lodash.has(rawData, dataPath);
        return isFound;
    }


    /**
     * @param {String} dataPath
     * @param {Any} value
     */
    push(dataPath, value) {
        return this.update(dataPath, (d) => {
            if (typeof d == "undefined" || isNull(d)) d = [];
            if (!Array.isArray(d)) throw `${dataPath} is not a array!`;
            d.push(value);
            return d;
        })
    }

    /**
     * @param {String} dataPath
     * @param {Any} value
     */
    shift(dataPath, value) {
        return this.update(dataPath, (d) => {
            if (typeof d == "undefined" || isNull(d)) d = [];
            if (!Array.isArray(d)) throw `${dataPath} is not a array!`;
            d.shift(value);
            return d;
        })
    }


    /**
    * @param {String} dataPath
    * @param {Any} value
    */
    add(dataPath, value) {
        return this.update(dataPath, (d) => {
            if (typeof d == "undefined" || isNull(d)) d = 0;
            d = d + value;
            return d;
        })
    }

    /**
    * @param {String} dataPath
    * @param {Any} value
    */
    subtract(dataPath, value) {
        return this.update(dataPath, (d) => {
            if (typeof d == "undefined" || isNull(d)) d = 0;
            d = d - value;
            return d;
        })
    }

    /**
    * @param {String} dataPath
    * @param {Any} value
    */
    multiply(dataPath, value) {
        return this.update(dataPath, (d) => {
            if (typeof d == "undefined" || isNull(d)) d = 0;
            d = d * value;
            return d;
        })
    }

    /**
    * @param {String} dataPath
    * @param {Any} value
    */
    division(dataPath, value) {
        return this.update(dataPath, (d) => {
            if (typeof d == "undefined" || isNull(d)) d = 0;
            d = d / value;
            return d;
        })
    }
}

module.exports = { DocumentManager };