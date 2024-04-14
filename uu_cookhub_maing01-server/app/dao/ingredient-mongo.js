"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class IngredientMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = IngredientMongo;
