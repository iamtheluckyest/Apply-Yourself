import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {Dashboard, LearnMore, LoginPage, School, Search, SearchResults, SetDefaults, SignUpPage, Start, ChangeDefaults, NoMatch} from "./pages"
import { Navigation } from "./components/Nav"
import Auth from "./Auth.js"
import API from "./utils/API"

class App extends Component {
  state = {
    showNav : true,
    searchResults : "",
    user: undefined
  }

  componentDidMount() {
    API.getUser()
    .then(res => this.setState({user: res.data}))
    .catch(err => {
      console.log(err)
      this.setState({user: undefined})
    })
  }

  showHideNav = showOrHide => {
    this.setState({showNav: showOrHide})
  }

  setSearchResults = (res, redirect) => {
    this.setState( {searchResults: res}, () => redirect() )
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
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" render={() => {
              Auth.deauthenticateUser();
              return <Redirect to="/"/>
            }}/>
            <Route path="/school/:apiId" render={(props) => (
              <School {...props}/>
            )}/>
            <Route exact path="/search" render={props => (
              <Search {...props} setSearchResults={this.setSearchResults} />
            )} />
            <Route exact path="/searchResults" render={props =>(
              <SearchResults {...props} results={this.state.searchResults} user={this.state.user}/>
            )}/>
            <Route exact path="/setDefaults" component={SetDefaults} />
            <Route exact path="/changeDefaults" component={ChangeDefaults} />
            <Route exact path="/signup" component={SignUpPage}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
