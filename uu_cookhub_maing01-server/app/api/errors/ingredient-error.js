"use strict";

const CookhubMainUseCaseError = require("./cookhub-main-use-case-error.js");
const INGREDIENT_ERROR_PREFIX = `${CookhubMainUseCaseError.ERROR_PREFIX}ingredient/`;

const Create = {
  UC_CODE: `${INGREDIENT_ERROR_PREFIX}create/`,

};

const Update = {
  UC_CODE: `${INGREDIENT_ERROR_PREFIX}update/`,

};

const Delete = {
  UC_CODE: `${INGREDIENT_ERROR_PREFIX}delete/`,

};

const List = {
  UC_CODE: `${INGREDIENT_ERROR_PREFIX}list/`,

};

const Get = {
  UC_CODE: `${INGREDIENT_ERROR_PREFIX}get/`,

};

module.exports = {
  Get,
  List,
  Delete,
  Update,
  Create
};
