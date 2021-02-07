import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import config from "./config";
import EditOpportunity from "./components/opportunity/EditOpportunity";
import ShowOpportunity from "./components/opportunity/ShowOpportunity";
import ListOpportunity from "./components/opportunity/ListOpportunity";
import AddOpportunity from "./components/opportunity/AddOpportunity";
import Biosearch from "./components/biosearch/Biosearch";

const client = new ApolloClient({ uri: config.graphqlEndpoint });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={Biosearch} />
        <Route path="/list" component={ListOpportunity} />
        <Route path="/edit/:id" component={EditOpportunity} />
        <Route path="/show/:id" component={ShowOpportunity} />
        <Route path="/opportunities/:id_user" component={AddOpportunity} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
