"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/ingredient-error.js");
const WARNINGS = require("../api/warnings/ingredient-warning.js");

class IngredientAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("ingredient");
    this.recipeDao = DaoFactory.getDao("recipe");
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    let ingredient;
    let validationResult = this.validator.validate("ingredientGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn,
    );

    if (dtoIn.name) {
      ingredient = await this.dao.getByName(awid, dtoIn.name);
    } else {
      ingredient = await this.dao.get(awid, dtoIn.id);
    }

    if (!ingredient) {
      throw new Errors.Get.ingredientDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    return {
      ...ingredient,
      uuAppErrorMap,
    };
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    let ingredients;
    let validationResult = this.validator.validate("ingredientListDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn,
    );

    ingredients = await this.dao.list(awid, dtoIn.userId);

    if (!ingredients) {
      throw new Errors.List.ItemDoesNotExist({ uuAppErrorMap });
    }

    return {
      ...ingredients,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    let validationResult = this.validator.validate("ingredientDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn,
    );

    let ingredient = await this.dao.get(awid, dtoIn.id);

    let recipes = await this.recipeDao.listByIngredientId(awid, dtoIn.id);

    for (let recipe of recipes.itemList) {
      let dtoUpdated;

      recipe.ingredientList = recipe.ingredientList.filter((ingredient) => ingredient.id !== dtoIn.id);

      if (ingredient.nutritionalValues) {
        let updatedNutritionalValues = { ...recipe.nutritionalValues };

        updatedNutritionalValues.calories -= ingredient.nutritionalValues.calories;
        updatedNutritionalValues.proteins -= ingredient.nutritionalValues.proteins;
        updatedNutritionalValues.carbs -= ingredient.nutritionalValues.carbs;
        updatedNutritionalValues.sugars -= ingredient.nutritionalValues.sugars;
        updatedNutritionalValues.fats -= ingredient.nutritionalValues.fats;

        dtoUpdated = {
          id: recipe.id,
          ingredientList: recipe.ingredientList,
          nutritionalValues: updatedNutritionalValues,
        };
      } else {
        dtoUpdated = {
          id: recipe.id,
          ingredientList: recipe.ingredientList,
        };
      }

      await this.recipeDao.update({ ...dtoUpdated, awid });
    }

    if (!ingredient) {
      throw new Errors.Get.IngredientDoesNotExist({ uuAppErrorMap }, { ingredientId: dtoIn.id });
    }

    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.IngredientDeleteFailed({ uuAppErrorMap }, e);
    }
    return {
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    let ingredientDtoOut;
    let validationResult = this.validator.validate("ingredientUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn,
    );

    let ingredient = await this.dao.get(awid, dtoIn.id);

    if (!ingredient) {
      throw new Errors.Get.IngredientDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    function nutritionalValuesChanged(obj1 = ingredient.nutritionalValues, obj2 = dtoIn.nutritionalValues) {
      for (let key in obj1) {
        if (obj2[key] === undefined || obj1[key] !== obj2[key]) {
          return true;
        }
      }
      return false;
    }

    if (nutritionalValuesChanged()) {
      let recipes = await this.recipeDao.listByIngredientId(awid, dtoIn.id);

      for (let recipe of recipes.itemList) {
        let updatedNutritionalValues = { ...recipe.nutritionalValues };

        updatedNutritionalValues.calories += dtoIn.nutritionalValues.calories - ingredient.nutritionalValues.calories;
        updatedNutritionalValues.proteins += dtoIn.nutritionalValues.proteins - ingredient.nutritionalValues.proteins;
        updatedNutritionalValues.carbs += dtoIn.nutritionalValues.carbs - ingredient.nutritionalValues.carbs;
        updatedNutritionalValues.sugars += dtoIn.nutritionalValues.sugars - ingredient.nutritionalValues.sugars;
        updatedNutritionalValues.fats += dtoIn.nutritionalValues.fats - ingredient.nutritionalValues.fats;

        let dtoUpdated = {
          id: recipe.id,
          nutritionalValues: updatedNutritionalValues,
        };

        await this.recipeDao.update({ ...dtoUpdated, awid });
      }
    }

    try {
      ingredientDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Update.IngredientUpdateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...ingredientDtoOut,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let ingredientDtoOut;
    let validationResult = this.validator.validate("ingredientCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );

    try {
      ingredientDtoOut = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Create.ItemCreateFailed({ uuAppErrorMap }, e);
    }

    return {
      ...ingredientDtoOut,
      uuAppErrorMap,
    };
  }
}

module.exports = new IngredientAbl();
