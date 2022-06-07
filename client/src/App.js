import {HeaderComponent} from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {ClientComponent} from "./components/Client";

// setup the apollo client in react
const client = new ApolloClient({
  uri: 'http://localhost:3500/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <HeaderComponent />
        <div className="container">
          <ClientComponent />
        </div>
      </ApolloProvider>
    </>

  );
}

export default App;
