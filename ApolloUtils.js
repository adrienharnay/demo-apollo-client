import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import loggerLink from 'apollo-link-logger';
import { Constants } from 'expo';
import { AsyncStorage } from 'react-native';

export const createClient = async () => {
  const cache = new InMemoryCache();

  await persistCache({
    storage: AsyncStorage,
    cache,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.error(`[Network error]: ${networkError}`);

      if (networkError.statusCode === 401) {
        cache.writeData({ data: { token: '' } });
      }
    }
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      device_id: Constants.deviceId,
    },
  }));

  const httpLink = new HttpLink({
    uri: 'https://demo-apollo-server.herokuapp.com/graphql',
  });

  return new ApolloClient({
    link: ApolloLink.from(
      [
        process.env.DEBUG_APOLLO && loggerLink,
        errorLink,
        authLink,
        httpLink,
      ].filter(Boolean),
    ),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
};
