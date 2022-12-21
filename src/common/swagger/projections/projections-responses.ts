import { Projection } from '@Src/database/schemas';

export const ProjectionsResponses = {
  get: {
    status: 200,
    description: 'The list of projections has been successfully retrieved.',
  },
  getSingle: {
    status: 200,
    description: 'The  projection has been successfully retrieved.',
    type: Projection,
  },
  create: {
    status: 200,
    description:
      'The list of created projections has been successfully retrieved.',
  },
  update: {
    status: 200,
    description: 'The updated projection has been successfully retrieved.',
    type: Projection,
  },
  deleteSinge: {
    status: 200,
    description: 'The deleted projection has been successfully retrieved.',
    type: Projection,
  },
  delete: {
    status: 200,
    description:
      'Boolean value confirming if projections were successfully deleted.',
    type: Boolean,
  },
};

// export const getProjectionsResponse = {
//   status: 200,
//   description: 'The list of projections has been successfully retrieved.',
// };

// export const getSingleProjectionResponse = {
//   status: 200,
//   description: 'The  projection has been successfully retrieved.',
//   type: Projection,
// };

// export const createProjectionsResponse = {
//   status: 200,
//   description:
//     'The list of created projections has been successfully retrieved.',
// };

// export const updateProjectionResponse = {
//   status: 200,
//   description: 'The updated projection has been successfully retrieved.',
//   type: Projection,
// };

// export const deleteSingleProjectionResponse = {
//   status: 200,
//   description: 'The deleted projection has been successfully retrieved.',
//   type: Projection,
// };

// export const deleteProjectionsResponse = {
//   status: 200,
//   description:
//     'Boolean value confirming if projections were successfully deleted.',
//   // type: Boolean,
// };
