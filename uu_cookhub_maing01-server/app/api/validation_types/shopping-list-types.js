/* eslint-disable */

const shoppingListCreateDtoInType = shape({
  userId: string(255).isRequired(),
});

const shoppingListGetDtoInType = shape({
  userId: string(255).isRequired(),
});

const shoppingListUpdateDtoInType = shape({
  userId: string(255).isRequired(),
  ingredientList: array(
    shape({
      ingredientId: id().isRequired(),
      quantity: number(),
      unit: oneOf(["g", "kg", "tsp", "tbsp", "l", "ml"]),
    }),
  ),
});
