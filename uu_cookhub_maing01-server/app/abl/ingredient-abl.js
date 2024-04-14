"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/ingredient-error.js");

const WARNINGS = {

};

class IngredientAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("ingredient");
  }

  async get(awid, dtoIn) {
    
  }

  async list(awid, dtoIn) {
    
  }

  async delete(awid, dtoIn) {
    
  }

  async update(awid, dtoIn) {
    
  }

  async create(awid, dtoIn) {
    
  }

}

module.exports = new IngredientAbl();
