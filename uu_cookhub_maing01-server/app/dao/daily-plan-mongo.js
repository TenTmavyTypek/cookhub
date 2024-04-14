"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DailyPlanMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = DailyPlanMongo;
