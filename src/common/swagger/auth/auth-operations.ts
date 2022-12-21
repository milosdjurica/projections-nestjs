export const AuthOperations = {
  register: {
    summary: 'Register new User',
    description: 'Only admin is allowed to register new user',
  },
  login: {
    summary: 'Login to get JWT token',
    description:
      'JWT token dont allow user to use all routes, because some of them are only allowed to admin',
  },
  logout: {
    summary: 'Logout route',
    description:
      'Deletes refresh token from database for this user (sets it to null value)',
  },
  refresh: {
    summary: 'Refresh token for user in database',
    description:
      'Jwt token doesnt work for this, pass refresh token for this route instead',
  },
};

// export const registerOperation = {
//   summary: 'Register new User',
//   description: 'Only admin is allowed to register new user',
// };

// export const loginOperation = {
//   summary: 'Login to get JWT token',
//   description:
//     'JWT token dont allow user to use all routes, because some of them are only allowed to admin',
// };

// export const logoutOperation = {
//   summary: 'Logout route',
//   description:
//     'Deletes refresh token from database for this user (sets it to null value)',
// };

// export const refreshOperation = {
//   summary: 'Refresh token for user in database',
//   description:
//     'Jwt token doesnt work for this, pass refresh token for this route instead',
// };
