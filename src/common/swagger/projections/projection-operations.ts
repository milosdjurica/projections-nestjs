export const ProjectionsOperations = {
  get: {
    summary: 'Get list of all projections',
    description: 'Returns array of json formated projections',
  },
  getSingle: {
    summary: 'Get specific projection',
    description: 'Returns projection in json form',
  },
  create: {
    summary: 'This method create new projections from csv file',
    description: `Only admin is allowed to do this.This method accepts csv in form of CreateProjectionDto, it is not showed in docs, have to fix this`,
  },
  update: {
    summary: 'Update projection route',
    description:
      'Only admin is allowed to do this. This is used to change field granica and totalPoints',
  },
  deleteSingle: {
    summary: 'Delete a single projection by id from database',
    description: 'Only admin is allowed to do this',
  },
  delete: {
    summary: 'Delete all projection from database',
    description: 'Only admin is allowed to do this',
  },
};

// !this looks nicer but creates too much imports in projections controller
// export const getProjectionsOperation = {
//   summary: 'Get list of all projections',
//   description: 'Returns array of json formated projections',
// };

// export const getSingleProjectionOperation = {
//   summary: 'Get specific projection',
//   description: 'Returns projection in json form',
// };

// export const createProjectionOperation = {
//   summary: 'This method create new projections from csv file',
//   description: `Only admin is allowed to do this.This method accepts csv in form of CreateProjectionDto, it is not showed in docs, have to fix this`,
// };

// export const updateProjectionOperation = {
//   summary: 'Update projection route',
//   description:
//     'Only admin is allowed to do this. This is used to change field granica and totalPoints',
// };

// export const deleteSingleProjectionOperation = {
//   summary: 'Delete a single projection by id from database',
//   description: 'Only admin is allowed to do this',
// };

// export const deleteProjectionsOperation = {
//   summary: 'Delete all projection from database',
//   description: 'Only admin is allowed to do this',
// };
