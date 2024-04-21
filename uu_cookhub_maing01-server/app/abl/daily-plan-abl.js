"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/daily-plan-error.js");
const WARNINGS = require("../api/warnings/daily-plan-warning.js");

class DailyPlanAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("dailyPlan");
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("dailyPlanGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn,
    );

    let dailyPlan = await this.dao.get(awid, dtoIn.id);

    if (!dailyPlan) {
      throw new Errors.Get.DailyPlanDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    return {
      ...dailyPlan,
      uuAppErrorMap,
    };
  }

  async listByWeek(awid, dtoIn, uuAppErrorMap = {}) {
    let dailyPlans;
    let validationResult = this.validator.validate("dailyPlanListByWeekDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.ListByWeek.UnsupportedKeys.code,
      Errors.ListByWeek.InvalidDtoIn,
    );

    dailyPlans = await this.dao.listByWeek(awid, dtoIn.userId, dtoIn.weekNumber);

    if (!dailyPlans) {
      throw new Errors.List.DailyPlansDoNotExist({ uuAppErrorMap });
    }

    return {
      ...dailyPlans,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    let dailyPlanDtoOut;
    let validationResult = this.validator.validate("dailyPlanUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn,
    );

    let dailyPlan = await this.dao.get(awid, dtoIn.id);

    if (!dailyPlan) {
      throw new Errors.Get.DailyPlanDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    try {
      dailyPlanDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Update.DailyPlanUpdateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...dailyPlanDtoOut,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("dailyPlanDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn,
    );

    let dailyPlan = await this.dao.get(awid, dtoIn.id);

    if (!dailyPlan) {
      throw new Errors.Get.DailyPlanDoesNotExist({ uuAppErrorMap }, { dailyPlanid: dtoIn.id });
    }

    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.dailyPlanDeleteFailed({ uuAppErrorMap }, e);
    }
    return {
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let dailyPlanDtoOut;

    try {
      dailyPlanDtoOut = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.DailyPlanCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...dailyPlanDtoOut,
      uuAppErrorMap,
    };
  }
}

module.exports = new DailyPlanAbl();
