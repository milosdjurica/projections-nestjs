import { User } from '@Src/database/schemas';

export const UserResponses = {
  get: {
    status: 200,
    description:
      'The list of users has been successfully retrieved (without hash and hashedRt).',
  },
  getSingle: {
    status: 200,
    description:
      'The user specified by ID has been successfully retrieved (without hash and hashedRt).',
    type: User,
  },
  update: {
    status: 200,
    description:
      'The updated user has been successfully retrieved (without hash and hashedRt).',
    type: User,
  },
  delete: {
    status: 200,
    description:
      'The deleted user has been successfully retrieved (without hash and hashedRt).',
    type: User,
  },
};
