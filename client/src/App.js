import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Dashboard, Search, Start, NoMatch} from "./pages"
import { Navigation } from "./components/Nav"

const App = () =>
<Router>
  <Navigation />
  <div>
    <Switch>
      <Route exact path="/" component={Start}/>
      <Route exact path="/Search" component={Search}/>
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route component={NoMatch}/>
    </Switch>
  </div>
</Router>;

export default App;
