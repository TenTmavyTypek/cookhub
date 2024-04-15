/* eslint-disable */

const dailyPlanCreateDtoInType = shape({
  userId: string(255).isRequired(),
  date: date().isRequired(),
  recipeIdList: array(id().isRequired()),
  weekNumber: number().isRequired(),
});

const dailyPlanDeleteDtoIn = shape({
  userId: id().isRequired(),
  id: id().isRequired(),
});

const dailyPlanUpdateDtoInType = shape({
  id: id().isRequired(),
  date: date(),
  recipeIdList: array(id().isRequired),
  weekNumber: number(),
});

const dailyPlanGetDtoIn = shape({
  id: id().isRequired(),
});

const dailyPlanListByWeekDtoIn = shape({
  userId: string(255).isRequired,
  weekNumber: number().isRequired(),
});
