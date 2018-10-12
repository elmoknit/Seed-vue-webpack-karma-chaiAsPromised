import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: 'your address here'
});

const memoryCache = new InMemoryCache({
  dataIdFromObject: object => object.key || null
});

export default class GraphQLClient {
  constructor () {
    this.client = new ApolloClient({ link: httpLink, cache: memoryCache, connectToDevTools: true });
  }

  apiPost (mutation, payload) {
    return this.client.mutate({
      mutation: mutation,
      variables: payload
    });
  }
}
