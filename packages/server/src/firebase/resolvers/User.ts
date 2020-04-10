

export const userResolver = (database) => {
  const firebaseUsers = database.ref('users/');

  return {
    Query: {
      searchNames: async (parent, { searchRequest }, { me }) => {
        const { name } = searchRequest;
        return new Promise(resolve => {
          firebaseUsers.orderByChild('name').once('value', (response) => {
            // console.log('dbResponse', response.val())
            resolve(Object.values(response.val()));
          });
        });

      }
    },
    Mutation: {
      setName: async (parent, { nameRequest }, { me }) => {
        const { name, surname } = nameRequest;

        if (!name || !surname) return null;

        await firebaseUsers.push({
          name,
          surname
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
