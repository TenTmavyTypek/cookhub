"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class IngredientMongo extends UuObjectDao {
  async list(awid, id) {
    const filter = {
      awid: awid,
      userId: id,
    };
    return await super.find(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    const filter = {
      awid: awid,
      id: id,
    };

    return await super.findOne(filter);
  }

  async getByName(awid, name) {
    const filter = {
      awid: awid,
      name: name,
    };

    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    return await super.deleteOne({ awid, id: id });
  }
}

module.exports = IngredientMongo;
