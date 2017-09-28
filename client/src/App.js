import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Dashboard, Search, Start, NoMatch} from "./pages"

const App = () =>
<Router>
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
