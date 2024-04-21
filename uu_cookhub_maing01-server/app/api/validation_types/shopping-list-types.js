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
      id: id().isRequired(),
      quantity: number(),
      unit: oneOf(["g", "kg", "l", "ml", "pcs"]),
    }),
  ),
});
