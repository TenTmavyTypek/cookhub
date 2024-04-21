/* eslint-disable */

const recipeCreateDtoInType = shape({
  userId: string().isRequired(),
  name: string(100).isRequired(),
  image: string(255),
  method: string(),
  ingredientList: array(
    shape({
      id: id().isRequired(),
      quantity: number(),
      unit: oneOf(["g", "kg", "l", "ml", "pcs"]),
    }),
  ),
});

const recipeDeleteDtoInType = shape({
  id: id().isRequired(),
});

const recipeUpdateDtoInType = shape({
  userId: string(),
  id: id().isRequired(),
  name: string(100),
  image: string(255),
  method: string(),
  ingredientList: array(
    shape({
      id: id().isRequired(),
      quantity: number(),
      unit: oneOf(["g", "kg", "l", "ml", "pcs"]),
    }),
  ),
  nutritionalValues: shape({
    calories: number().isRequired(),
    proteins: number(),
    carbs: number(),
    sugars: number(),
    fats: number(),
  }),
});

const recipeGetDtoInType = shape({
  id: id().isRequired(),
});

const recipeListDtoInType = shape({
  userId: string(255).isRequired(),
  dailyPlanId: id(),
});
