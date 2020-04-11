import { uuid } from 'uuidv4';
import { database } from '../helpers/db';
import { getToken, encryptPassword, comparePassword } from '../helpers/tokens';
import { AuthenticationError } from 'apollo-server-express';

export interface User {
  id: string,
  name: string,
  surname: string
}


const firebaseUsers = database.ref('users/');

export const getUserWithFilters = (filters: {[key: string]: string}): Promise<any[]> => new Promise(resolve => {
  const validateFilter = (filter: string, value: string) => typeof filter === 'undefined' || filter === value;

  firebaseUsers.once('value', (response) => {
    if (response.val() === null) {
      resolve([]);
    } else {
      const records = Object.values(response.val()).filter(({ id, name, surname }: User) =>
        validateFilter(filters.id, id) &&
        validateFilter(filters.name, name) &&
        validateFilter(filters.surname, surname));
      resolve(records);
    }
  });
});

export const userResolver = {
  Query: {
    searchUsers: async (parent, { searchRequest }, context) => {
      const data = await getUserWithFilters(searchRequest);
      return {
        data,
        error: data.length === 0 ? 'No records found' : ''
      };

    },
    login: async (parent, { userRequest}, context) => {
      const { id, password } = userRequest;
      const records = await getUserWithFilters({ id });

      if (!records[0]) {
        return {
          error: 'User not found.'
        }
      }
      const user = records[0];

      const isMatch = await comparePassword(password, user.password)

      if (!isMatch) {
        throw new AuthenticationError(`Invalid password`);
      }
      return {
        data: user,
        token: getToken(user),
      };
    }
  },
  Mutation: {
    register: async (parent, { userRequest }, context) => {
      const { name, surname, password } = userRequest;

      if (!name || !surname || !password) {
        throw new AuthenticationError('Invalid register request.')
      }

      const existUsers = await getUserWithFilters(userRequest);
      if (existUsers.length > 0) return ({
        error: `User with ${name}, ${surname} already exists.`
      });

      const id = uuid();
      const role = 1;
      
      const user = {
        id,
        name,
        surname,
        role,
        password: await encryptPassword(password)
      }

      await firebaseUsers.push(user).catch((err) => {
        console.log('fire base error', err)
      })

      return {
        ...user,
        token: getToken(user)
      }
    }
  }
};
