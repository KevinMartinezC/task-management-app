import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_API_URL,
});

// Middleware para agregar el token de autorización en cada solicitud
const authLink = setContext((_, { headers }) => {
  const token = process.env.EXPO_PUBLIC_AUTHORIZATION_TOKEN;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]), // Middleware + HTTP Link
  cache: new InMemoryCache(),
});
