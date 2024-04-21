/* eslint-disable */

const ingredientCreateDtoInType = shape({
  userId: string(255).isRequired(),
  name: string(100).isRequired(),
  nutritionalValues: shape({
    calories: number().isRequired(),
    proteins: number(),
    carbs: number(),
    sugars: number(),
    fats: number(),
  }),
});

const ingredientDeleteDtoInType = shape({
  id: id().isRequired(),
});

const ingredientUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(100),
  nutritionalValues: shape({
    calories: number().isRequired(),
    proteins: number(),
    carbs: number(),
    sugars: number(),
    fats: number(),
  }),
});

const ingredientGetDtoInType = shape({
  id: id().isRequired(["name"]),
  name: string(100).isRequired(["id"]),
});

const ingredientListDtoInType = shape({
  userId: string(255).isRequired(),
});
