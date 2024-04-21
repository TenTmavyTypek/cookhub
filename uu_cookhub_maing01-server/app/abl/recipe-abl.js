"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/recipe-error.js");
const WARNINGS = require("../api/warnings/recipe-warning.js");

class RecipeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("recipe");
    this.ingredientDao = DaoFactory.getDao("ingredient");
    this.dailyPlanDao = DaoFactory.getDao("dailyPlan");
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("recipeGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn,
    );

    let recipe = await this.dao.get(awid, dtoIn.id);

    if (!recipe) {
      throw new Errors.Get.ItemDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    return {
      ...recipe,
      uuAppErrorMap,
    };
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    let recipes;
    let dailyPlan;
    let validationResult = this.validator.validate("recipeListDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn,
    );

    if (dtoIn.dailyPlanId) {
      recipes = { itemList: [] };
      dailyPlan = await this.dailyPlanDao.get(awid, dtoIn.dailyPlanId);
      if (!dailyPlan) {
        throw new Errors.List.DailyPlanDoesNotExist({ uuAppErrorMap }, dtoIn.dailyPlanId);
      }

      for (let id of dailyPlan.recipeIdList) {
        let recipe = await this.dao.get(awid, id);
        recipes.itemList.push(recipe.itemList);
      }
    } else {
      recipes = await this.dao.list(awid, dtoIn.userId);
    }

    if (!recipes) {
      throw new Errors.List.ItemDoesNotExist({ uuAppErrorMap });
    }

    return {
      ...recipes,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    let recipeDtoOut;
    let validationResult = this.validator.validate("recipeUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn,
    );

    let recipe = await this.dao.get(awid, dtoIn.id);

    if (!recipe) {
      throw new Errors.Get.RecipeDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    if (dtoIn.ingredientList) {
      for (let ingredientObject of dtoIn.ingredientList) {
        let ingredient = await this.ingredientDao.get(awid, ingredientObject.id);
        if (!ingredient) {
          throw new Errors.Create.InvalidIngredientList({ uuAppErrorMap }, { ingredientId: ingredientObject.id });
        }

        if (ingredient.nutritionalValues) {
          nutritionalValues.calories += ingredient.nutritionalValues.calories;
          nutritionalValues.proteins += ingredient.nutritionalValues.proteins;
          nutritionalValues.carbs += ingredient.nutritionalValues.carbs;
          nutritionalValues.sugars += ingredient.nutritionalValues.sugars;
          nutritionalValues.fats += ingredient.nutritionalValues.fats;
        }
      }

      dtoIn = {
        ...dtoIn,
        nutritionalValues: nutritionalValues,
      };
    }

    try {
      recipeDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Update.RecipeUpdateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...recipeDtoOut,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let recipeDtoOut;
    let nutritionalValues = {
      calories: 0,
      proteins: 0,
      carbs: 0,
      sugars: 0,
      fats: 0,
    };
    let validationResult = this.validator.validate("recipeCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );

    for (let ingredientObject of dtoIn.ingredientList) {
      let ingredient = await this.ingredientDao.get(awid, ingredientObject.id);
      if (!ingredient) {
        throw new Errors.Create.InvalidIngredientList({ uuAppErrorMap }, { ingredientId: ingredientObject.id });
      }

      if (ingredient.nutritionalValues) {
        nutritionalValues.calories += ingredient.nutritionalValues.calories;
        nutritionalValues.proteins += ingredient.nutritionalValues.proteins;
        nutritionalValues.carbs += ingredient.nutritionalValues.carbs;
        nutritionalValues.sugars += ingredient.nutritionalValues.sugars;
        nutritionalValues.fats += ingredient.nutritionalValues.fats;
      }
    }

    let recipeCreateDtoIn = {
      ...dtoIn,
      nutritionalValues: nutritionalValues,
    };

    try {
      recipeDtoOut = await this.dao.create({ ...recipeCreateDtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...recipeDtoOut,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("recipeDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn,
    );

    let recipe = await this.dao.get(awid, dtoIn.id);

    if (!recipe) {
      throw new Errors.Get.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }

    console.log("recipeId", recipe.id);

    let dailyPlans = await this.dailyPlanDao.listByRecipeId(awid, String(recipe.id));
    console.log("dailyPlans", dailyPlans);

    for (let dailyPlan of dailyPlans.itemList) {
      let idList = dailyPlan.recipeIdList;
      console.log("idList", idList);
      const filteredIdList = idList.filter((item) => item !== String(recipe.id));

      const dtoUpdated = {
        id: dailyPlan.id,
        recipeIdList: filteredIdList,
      };

      if (!filteredIdList.length) {
        await this.dailyPlanDao.delete(awid, dailyPlan.id);
      } else {
        await this.dailyPlanDao.update({ ...dtoUpdated, awid });
      }
    }

    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.RecipeDeleteFailed({ uuAppErrorMap }, e);
    }
    return {
      uuAppErrorMap,
    };
  }
}

module.exports = new RecipeAbl();
