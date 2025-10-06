import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Use relative URL in development (via Next.js proxy) for same-origin cookies
// Use absolute URL in production
const getApiUrl = () => {
  // If we're in the browser and on localhost, use relative URL (will be proxied by Next.js)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8080/api/graphql';
  }

  // Otherwise use the configured API URL
  return "https://api.traveltrust.com.np/api/graphql";
};

const httpLink = createHttpLink({
  uri: getApiUrl(),
  credentials: 'include', // Important for session cookies
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
