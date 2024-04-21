"use strict";

const CookhubMainUseCaseError = require("./cookhub-main-use-case-error.js");
const DAILY_PLAN_ERROR_PREFIX = `${CookhubMainUseCaseError.ERROR_PREFIX}dailyPlan/`;

const Create = {
  UC_CODE: `${DAILY_PLAN_ERROR_PREFIX}create/`,
};

const Delete = {
  UC_CODE: `${DAILY_PLAN_ERROR_PREFIX}delete/`,
};

const Update = {
  UC_CODE: `${DAILY_PLAN_ERROR_PREFIX}update/`,

  DailyPlanUpdateFailed: class extends CookhubMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dailyPlanUpdateFailed`;
      this.message = "Daily plan update failed";
    }
  },
};

const ListByWeek = {
  UC_CODE: `${DAILY_PLAN_ERROR_PREFIX}listByWeek/`,
};

const Get = {
  UC_CODE: `${DAILY_PLAN_ERROR_PREFIX}get/`,

  DailyPlanDoesNotExist: class extends CookhubMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dailyPlanDoesNotExist`;
      this.message = "Daily plan does not exist.";
    }
  },
};

module.exports = {
  Get,
  ListByWeek,
  Update,
  Delete,
  Create,
};
