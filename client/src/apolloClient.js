import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_SERVER });

console.log(import.meta.env.VITE_GRAPHQL_SERVER);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
