import React, {Component} from 'react';
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
        <Navbar color="light" toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Apply Yourself</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {Auth.isUserAuthenticated
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