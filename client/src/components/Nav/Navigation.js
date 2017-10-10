import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from "../../Auth.js";

export class Navigation extends Component {
  state = {
    collapsed: true    
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <Link to="/" className="navbar-brand" style={{color:"#FFF"}}>Apply Yourself</Link>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            {Auth.isUserAuthenticated()
              ?
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/search"><i className="fa fa-search default-icon" aria-hidden="true"></i></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/dashboard">My Colleges</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/logout/">Log out</NavLink>
                  </NavItem>
                </Nav>
              :
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/search"><i className="fa fa-search default-icon" aria-hidden="true"></i></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/login/">Log in/Sign up</NavLink>
                  </NavItem>
                </Nav>
            }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}