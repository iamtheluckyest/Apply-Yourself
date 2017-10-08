import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from "../../Auth.js";

export class Navigation extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="primary dark" expand="md">
          <Link to="/"><NavbarBrand>Apply Yourself</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {Auth.isUserAuthenticated()
                ?
                  <NavItem>
                    <NavLink href="/logout/">Log out</NavLink>
                  </NavItem>
                :
                  <NavItem>
                    <NavLink href="/login/">Log in/Sign up</NavLink>
                  </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}