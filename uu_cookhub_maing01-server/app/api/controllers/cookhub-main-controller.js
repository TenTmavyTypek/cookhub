"use strict";
const CookhubMainAbl = require("../../abl/cookhub-main-abl.js");

class CookhubMainController {
  init(ucEnv) {
    return CookhubMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return CookhubMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return CookhubMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new CookhubMainController();
