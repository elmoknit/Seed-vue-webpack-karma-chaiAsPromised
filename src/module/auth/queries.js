import gql from 'graphql-tag';

export const QUERY_LOGIN = gql`
   mutation login($credentials: AuthCredentials!) {
      login(credentials: $credentials) {
          id
      }
   }`;
