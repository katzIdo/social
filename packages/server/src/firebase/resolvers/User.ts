import { uuid } from 'uuidv4';

export interface User {
  id: string,
  name: string,
  surname: string
}

export const userResolver = (database) => {
  const firebaseUsers = database.ref('users/');

  const getUser = (filters: {[key: string]: string}): Promise<any[]> => new Promise(resolve => {
    const validateFilter = (filter: string, value: string) => typeof filter === 'undefined' || filter === value;

    firebaseUsers.once('value', (response) => {
      const records = Object.values(response.val()).filter(({ id, name, surname }: User) =>
        validateFilter(filters.id, id) &&
        validateFilter(filters.name, name) &&
        validateFilter(filters.surname, surname));
      resolve(records);
    });
  });

  return {
    Query: {
      searchUsers: async (parent, { searchRequest }, { me }) => {
        const data = await getUser(searchRequest);
        return {
          data,
          error : data.length === 0 ? 'No records found' : ''
        };

      },
      login: async (parent, { searchRequest }, { me }) => {
        const { id } = searchRequest;
        const records = await getUser({ id });

        return {
          data :records[0],
          error : records.length === 0 ? 'No records found.' : ''
        };
      }
    },
    Mutation: {
      register: async (parent, { nameRequest }, { me }) => {
        const { name, surname } = nameRequest;

        if (!name || !surname) return ({
          error: `Register require name and surname but got name:${name}, surname:${surname}.`
        });

        const existUsers = await getUser(nameRequest);
        if (existUsers.length > 0) return ({
          error: `User with ${name}, ${surname} already exists.`
        });

        const id = uuid();
        await firebaseUsers.push({
          id,
          name,
          surname,
        }).catch((err) => {
          console.log('fire base error', err)
        })

        return {
          name,
          surname
        }
      }
    }
  }
};
