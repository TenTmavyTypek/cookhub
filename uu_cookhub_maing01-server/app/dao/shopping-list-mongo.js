"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppingListMongo extends UuObjectDao {
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
}

module.exports = ShoppingListMongo;
