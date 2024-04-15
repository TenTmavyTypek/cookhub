/* eslint-disable */

const ingredientCreateDtoInType = shape({
  userId: string(255).isRequired(),
  name: string(100).isRequired(),
});

const ingredientDeleteDtoIn = shape({
  userId: id().isRequired(),
  id: id().isRequired(),
});

const ingredientUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(100),
});

const ingredientGetDtoIn = shape({
  id: id().isRequired(),
});

const ingredientListDtoIn = shape({
  userId: string(255).isRequired,
});
