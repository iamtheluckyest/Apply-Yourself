import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Col, Row } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Card, CardBlock} from 'reactstrap';
import {Header} from "../components/Header";
import Auth from "../Auth.js";
import axios from "axios";

const styles= {
    icon: {
        position: "absolute",
        top: "-40px",
        right: "0px"
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
        active : [],
        user : undefined
    }

    componentDidMount() {
        this.setState({
            active: [true, false, false]
        })
        let that = this;
        axios({
            url : '/user',
            method : "get",
            headers: {
                'Authorization' : `bearer ${Auth.getToken()}`
            },
        }).then(function(res){
            console.log(res);
            that.setState({
                user : res.data
            });
        }).catch(function(err){
            console.log(err);
            that.setState({
                user : undefined
            })
        });
    }
  
    changeActiveTab = index=> {
        const activeArr = [false, false, false];
        activeArr[index] = true;
        this.setState({
            active : activeArr
        })
    }
    render() {
        return (
            <Container>
                <Header>{this.props.schoolName}</Header>
                <Row>
                    <Col xs="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(0)} active={this.state.active[0]}>General Information</NavLink>
                            </NavItem>
                            {this.state.user ? 
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(1)} active={this.state.active[1]}>My Notes</NavLink>
                            </NavItem>
                            : ""
                            }
                            {this.state.user ? 
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(2)} active={this.state.active[2]}>Admissions Requirements</NavLink>
                            </NavItem>
                            : ""
                            }
                        </Nav>
                        <Card style={{borderTop:"none"}}>
                            {/* If there is no user signed in, clicking this should have you link to log in page;
                                If there is a user signed in, but this college is already in their list, this should be a link to remove college */}
                            {this.state.user ? "" :
                                <div>
                                    <h3 style={styles.icon}><Link to="#"><i className="fa fa-plus-square" aria-hidden="true"  title="Add school to dashboard"></i></Link></h3>
                                </div>
                            }
                            {this.state.active[0] ?
                            <CardBlock>
                            General info: <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
                            </CardBlock>
                            : ""
                            }
                            {this.state.active[1] ?
                            <CardBlock>
                            My Notes: <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
                            </CardBlock>
                            : ""
                            }
                            {this.state.active[2] ?
                            <CardBlock>
                            Admission Requirements: <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
                            </CardBlock>
                            : ""
                            }
                        </Card>
                    </Col>
                </Row>

            </Container>
        )
    }
}