/* eslint-disable */

const recipeCreateDtoInType = shape({
  userId: string(255).isRequired(),
  name: string(100).isRequired(),
  image: binary(),
  method: string(),
  ingredientList: array(
    shape({
      ingredientId: id().isRequired(),
      quantity: number(),
      unit: oneOf(["g", "kg", "tsp", "tbsp", "l", "ml"]),
    }),
  ),
});

const recipeDeleteDtoIn = shape({
  userId: id().isRequired(),
  id: id().isRequired(),
});

const recipeUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(100),
  image: binary(),
  method: string(),
  ingredientList: array(
    shape({
      ingredientId: id().isRequired(),
      quantity: number(),
      unit: oneOf(["g", "kg", "tsp", "tbsp", "l", "ml"]),
    }),
  ),
});

const recipeGetDtoIn = shape({
  id: id().isRequired(),
});

const recipeListDtoIn = shape({
  userId: string(255).isRequired(),
  dailyPlanId: id(),
});
