"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class RecipeMongo extends UuObjectDao {
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async list(awid, id) {
    const filter = {
      awid: awid,
      userId: id,
    };
    return await super.find(filter);
  }

  async listByIngredientId(awid, id) {
    const filter = {
      awid: awid,
      ingredientList: { $elemMatch: { id: id } },
    };
    return await super.find(filter);
  }

  async get(awid, id) {
    const filter = {
      awid: awid,
      id: id,
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

module.exports = RecipeMongo;
