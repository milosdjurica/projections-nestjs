export const UserOperations = {
  get: {
    summary: 'Get list of all users',
    description: 'Only admin is allowed to do this',
  },
  getSingle: {
    summary: 'Get user by ID',
    description: 'Only admin is allowed to do this',
  },
  update: {
    summary: 'Update one user',
    description:
      'Can change : username, password (requires to confirm it), isAdmin field. This action can be performed only by admin',
  },
  deleteSingle: {
    summary: 'Delete user by ID',
    description: 'Only admin is allowed to do this',
  },
};
