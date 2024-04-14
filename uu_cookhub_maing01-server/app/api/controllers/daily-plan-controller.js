"use strict";
const DailyPlanAbl = require("../../abl/daily-plan-abl.js");

class DailyPlanController {

  get(ucEnv) {
    return DailyPlanAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listByWeek(ucEnv) {
    return DailyPlanAbl.listByWeek(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return DailyPlanAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return DailyPlanAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return DailyPlanAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new DailyPlanController();
