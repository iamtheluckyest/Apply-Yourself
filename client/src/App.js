import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Dashboard, LearnMore, School, Search, SearchResults, Start, NoMatch} from "./pages"
import { Navigation } from "./components/Nav"

class App extends Component {
  state = {
    showNav : true
  }  

  showHideNav = showOrHide => {
    this.setState({showNav: showOrHide})
  }
  
  render() {
    return (
      <Router>
        <div>
          {this.state.showNav ? <Navigation /> : ""}
          <Switch>
            <Route exact path="/" render={(props) => (
              <Start {...props} showHideNav={this.showHideNav} />
            )}/>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/learnMore" component={LearnMore}/>
            <Route exact path="/school" render={(props) => (
              <School {...props} schoolName="Northwestern University"/>
            )}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/searchResults" component={SearchResults}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
