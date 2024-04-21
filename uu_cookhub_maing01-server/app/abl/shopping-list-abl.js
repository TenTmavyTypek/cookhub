"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/shopping-list-error.js");

const WARNINGS = require("../api/warnings/shopping-list-warning.js");

class ShoppingListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shoppingList");
    this.dailyPlanDao = DaoFactory.getDao("dailyPlan");
    this.recipeDao = DaoFactory.getDao("recipe");
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let shoppingListDtoOut;
    let validationResult = this.validator.validate("shoppingListCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );

    function getWeekNumber() {
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    console.log("weekNum", getWeekNumber());

    let dailyPlans = await this.dailyPlanDao.listByWeek(awid, dtoIn.userId, getWeekNumber());

    function getAllRecipeIds() {
      let allRecipeIds = [];
      for (let item of dailyPlans.itemList) {
        allRecipeIds = allRecipeIds.concat(item.recipeIdList);
      }
      return allRecipeIds;
    }

    const allRecipeIds = getAllRecipeIds();

    let recipes = await this.recipeDao.listByIds(awid, allRecipeIds);

    function getAllIngredients() {
      let allIngredients = [];
      for (let item of recipes.itemList) {
        allIngredients = allIngredients.concat(item.ingredientList);
      }
      return allIngredients;
    }

    const allIngredients = getAllIngredients();

    dtoIn = {
      ...dtoIn,
      ingredientsList: allIngredients,
    };

    try {
      shoppingListDtoOut = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...shoppingListDtoOut,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn) {}

  async create(awid, dtoIn) {}
}

module.exports = new ShoppingListAbl();
