import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Col, Row} from 'reactstrap';
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import {Card, CardBlock} from 'reactstrap';
import {Header} from "../components/Header";

const styles= {
    icon: {
        position: "absolute",
        top: "20px",
        right: "20px"
    }
}

/* Future functionality 
    On component mount:
*       - Call API to populate general fields
*       - If user is signed in, check db to see if school is in user's db
*           - If so, display user-generated info
*/

export class School extends Component {
    state = {
        dropdownOpen: false,
        active : [false, true, false]
    }
  
    toggle = () => {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
  
    render() {
        return (
            <Container>
                <Header>{this.props.schoolName}</Header>
                <Row>
                    <Col xs="12">
                        <h3 style={styles.icon}><Link to="/"><i className="fa fa-plus-square" aria-hidden="true"></i></Link></h3>
                    </Col>   
                </Row>
                <Row>
                    <Col xs="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink href="#" active={this.state.active[0]}>General Information</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" active={this.state.active[1]}>My Notes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" active={this.state.active[2]}>Admissions Requirements</NavLink>
                            </NavItem>
                        </Nav>
                        <Card style={{borderTop:"none"}}>
                            <CardBlock>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>

            </Container>
        )
    }
}