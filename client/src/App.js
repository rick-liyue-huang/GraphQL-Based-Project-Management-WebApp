import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {HeaderComponent} from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {HomePage} from "./pages/Home";
import {NotFoundPage} from "./pages/NotFoundPage";
import {ProjectPage} from "./pages/Project";

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
        <Router>
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path={'/'} element={<HomePage />} />
              <Route path={'/projects/:id'} element={<ProjectPage />} />
              <Route path={'*'} element={<NotFoundPage />} />

            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>

  );
}

export default App;
