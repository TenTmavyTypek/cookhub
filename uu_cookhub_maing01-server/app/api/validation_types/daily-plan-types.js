/* eslint-disable */

const dailyPlanCreateDtoInType = shape({
  userId: string(255).isRequired(),
  date: date().isRequired(),
  recipeIdList: array(id().isRequired()).isRequired(),
  weekNumber: number().isRequired(),
});

const dailyPlanDeleteDtoInType = shape({
  id: id().isRequired(),
});

const dailyPlanUpdateDtoInType = shape({
  id: id().isRequired(),
  date: date(),
  recipeIdList: array(id().isRequired()),
  weekNumber: number(),
});

const dailyPlanGetDtoInType = shape({
  id: id().isRequired(),
});

const dailyPlanListByWeekDtoInType = shape({
  userId: string(255).isRequired(),
  weekNumber: number().isRequired(),
});
