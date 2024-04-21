"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DailyPlanMongo extends UuObjectDao {
  async get(awid, id) {
    const filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async listByWeek(awid, userId, weekNumber) {
    const filter = {
      awid: awid,
      userId: userId,
      weekNumber: weekNumber,
    };

    return await super.find(filter);
  }

  async delete(awid, id) {
    return await super.deleteOne({ awid, id: id });
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async listByRecipeId(awid, id) {
    const filter = {
      awid: awid,
      recipeIdList: id,
    };
    return await super.find(filter);
  }
}

module.exports = DailyPlanMongo;
