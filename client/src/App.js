import {HeaderComponent} from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {ClientComponent} from "./components/Client";
import {CreateClientModal} from "./components/AddClientModal";

// solve the warnings of delete the client
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

// set up the apollo client in react
const client = new ApolloClient({
  uri: 'http://localhost:3500/graphql',
  // cache: new InMemoryCache()
  cache: cache
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <HeaderComponent />
        <div className="container">
          <CreateClientModal />
          <ClientComponent />
        </div>
      </ApolloProvider>
    </>

  );
}

export default App;
