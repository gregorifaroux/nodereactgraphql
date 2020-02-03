/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Route, HashRouter } from "react-router-dom";
// UI
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// Components
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import DeleteEmployee from "./components/DeleteEmployee";

const appoloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? `${window.location.protocol}//${window.location.host}/`
      : "https://localhost/"
});

function App() {
  const [active, setActive] = useState(false);

  return (
    <ApolloProvider client={appoloClient}>
      <HashRouter>
        <div className="App">
          <header>
            <br />
            <p>
              <code> Employee Records (GraphQL) </code>
            </p>
            <br />
          </header>
          <div className="bodystyle">
            <LoadingOverlay active={active} spinner text="Loading...">
              <Route
                exact
                path="/"
                render={props => (
                  <EmployeeList {...props} setLoading={setActive} />
                )}
              />
              <Route
                path="/add"
                render={props => (
                  <AddEmployee {...props} setLoading={setActive} />
                )}
              />
              <Route
                path="/edit"
                render={props => (
                  <EditEmployee {...props} setLoading={setActive} />
                )}
              />
              <Route
                path="/delete"
                render={props => (
                  <DeleteEmployee {...props} setLoading={setActive} />
                )}
              />
            </LoadingOverlay>{" "}
            <ToastContainer autoClose={4000} />
          </div>
        </div>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
