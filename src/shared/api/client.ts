import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IStorage } from '../storage/storage.type';
import { GRAPHQL_API_URL } from '../consts';

const httpLink = createHttpLink({
  uri: GRAPHQL_API_URL,
});

const client = (storage: IStorage) => {
  const authLink = setContext((_, { headers }) => {
    const token = storage.get();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default client;
