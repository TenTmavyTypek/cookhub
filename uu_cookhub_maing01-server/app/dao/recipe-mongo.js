"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class RecipeMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = RecipeMongo;
