import {getUserWithFilters} from './User';
import { AuthenticationError } from 'apollo-server-express';
import {ADMIN_ROLE} from '../helpers/constants';

export const adminResolver = {
  Query: {
    searchUsers: async (parent, { searchRequest }, {user, loggedIn}) => {
      if (!loggedIn) {
        throw new AuthenticationError('Please logged in');
      }

      if (user.role !== ADMIN_ROLE ) {
        throw new AuthenticationError('Not autherized.');
      }

      const data = await getUserWithFilters(searchRequest);

      return {
        data,
        error: data.length === 0 ? 'No records found' : ''
      };

    },
  },
};
