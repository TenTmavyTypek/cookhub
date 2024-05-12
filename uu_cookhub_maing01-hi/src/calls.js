import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  // recipe/create
  createRecipe(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/create");
    return Calls.call("post", commandUri, dtoInData);
  },

  // recipe/delete
  deleteRecipe(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/delete");
    return Calls.call("post", commandUri, dtoInData);
  },

  // recipe/update
  updateRecipe(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/update");
    return Calls.call("post", commandUri, dtoInData);
  },

  // recipe/list
  listRecipes(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/list");
    return Calls.call("get", commandUri, dtoInData);
  },

  // recipe/get
  getRecipe(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/get");
    return Calls.call("get", commandUri, dtoInData);
  },

  // dailyPlan/create
  createDailyPlan(dtoInData) {
    const commandUri = Calls.getCommandUri("dailyPlan/create");
    return Calls.call("post", commandUri, dtoInData);
  },

  // dailyPlan/delete
  deleteDailyPlan(dtoInData) {
    const commandUri = Calls.getCommandUri("dailyPlan/delete");
    return Calls.call("post", commandUri, dtoInData);
  },

  // dailyPlan/update
  updateDailyPlan(dtoInData) {
    const commandUri = Calls.getCommandUri("dailyPlan/update");
    return Calls.call("post", commandUri, dtoInData);
  },

  // dailyPlan/listByWeek
  listDailyPlansByWeek(dtoInData) {
    const commandUri = Calls.getCommandUri("dailyPlan/listByWeek");
    return Calls.call("get", commandUri, dtoInData);
  },

  // dailyPlan/get
  getDailyPlan(dtoInData) {
    const commandUri = Calls.getCommandUri("dailyPlan/get");
    return Calls.call("get", commandUri, dtoInData);
  },

  // ingredient/create
  createIngredient(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredient/create");
    return Calls.call("post", commandUri, dtoInData);
  },

  // ingredient/update
  updateIngredient(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredient/update");
    return Calls.call("post", commandUri, dtoInData);
  },

  // ingredient/delete
  deleteIngredient(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredient/delete");
    return Calls.call("post", commandUri, dtoInData);
  },

  // ingredient/list
  listIngredients(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredient/list");
    return Calls.call("get", commandUri, dtoInData);
  },

  // ingredient/get
  getIngredient(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredient/get");
    return Calls.call("get", commandUri, dtoInData);
  },

  // shoppingList/create
  createShoppingList(dtoInData) {
    const commandUri = Calls.getCommandUri("shoppingList/create");
    return Calls.call("post", commandUri, dtoInData);
  },

  // shoppingList/update
  updateShoppingList(dtoInData) {
    const commandUri = Calls.getCommandUri("shoppingList/update");
    return Calls.call("post", commandUri, dtoInData);
  },

  // shoppingList/get
  getShoppingList(dtoInData) {
    const commandUri = Calls.getCommandUri("shoppingList/get");
    return Calls.call("get", commandUri, dtoInData);
  },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
