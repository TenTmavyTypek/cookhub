"use strict";

const CookhubMainUseCaseError = require("./cookhub-main-use-case-error.js");
const RECIPE_ERROR_PREFIX = `${CookhubMainUseCaseError.ERROR_PREFIX}recipe/`;

const Create = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}create/`,

  InvalidIngredientList: class extends CookhubMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidIngredientList`;
      this.message = "Ingredient does not exist";
    }
  },
};

const Delete = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}delete/`,
};

const Update = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}update/`,
};

const List = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}list/`,

  DailyPlanDoesNotExist: class extends CookhubMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dailyPlanDoesNotExist`;
      this.message = "Daily plan does not exist.";
    }
  },
};

const Get = {
  UC_CODE: `${RECIPE_ERROR_PREFIX}get/`,
};

module.exports = {
  Get,
  List,
  Update,
  Delete,
  Create,
};
