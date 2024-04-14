"use strict";

const CookhubMainUseCaseError = require("./cookhub-main-use-case-error.js");
const SHOPPING_LIST_ERROR_PREFIX = `${CookhubMainUseCaseError.ERROR_PREFIX}shoppingList/`;

const Create = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}create/`,

};

const Update = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}update/`,

};

const Get = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}get/`,

};

module.exports = {
  Get,
  Update,
  Create
};
