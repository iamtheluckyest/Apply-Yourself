import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Dashboard, LearnMore, Search, Start, NoMatch, LoginPage, SignUpPage} from "./pages";
import { Navigation } from "./components/Nav";

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
            <Route exact path="/search" component={Search}/>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
