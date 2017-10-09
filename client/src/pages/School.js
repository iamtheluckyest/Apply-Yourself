import React, {Component} from "react";
import {Container, Col, Row } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Card, CardBody} from 'reactstrap';
import {Header} from "../components/Header";
import API from "../utils/API"

const styles= {
    icon: {
        position: "absolute",
        top: "-52px",
        right: "-20px"
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
        activeTab : [],
        user : undefined,
        school : {},
        schoolFound: false,
        schoolUserData : {}
    }

    componentDidMount() {
        document.title = "School"
        this.setState({
            activeTab: [true, false, false]
        })

        let authKey = "S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8";
        let queryUrl = "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=" + authKey + "&id=" + this.props.match.params.apiId;
        API.getSchoolById(queryUrl)
        .then(res => {
            console.log(res.data.results[0])
            this.setState({school: res.data.results[0]});
        })
        .catch(err => console.log(err))

        this.getUser();
    }
  
    changeActiveTab = index=> {
        const activeArr = [false, false, false];
        activeArr[index] = true;
        this.setState({
            activeTab : activeArr
        })
    }

    addSchool = apiId => { 
        API.addSchool(apiId)
        .then( () => this.getUser() )
        .catch(err=> console.log(err))
    }

    deleteSchool = collegeId => {
        API.deleteSchool(collegeId)
        .then( () => this.getUser() )
        .catch(err=> console.log(err));
    }

    getUser = () => {
        let that = this
        API.getUser()
        .then(function(res){
            console.log(res);
            that.setState({
                user : res.data
            }, () => {
                let schoolFound = that.state.user.colleges.filter( college => college.apiId === that.props.match.params.apiId )[0]  
                console.log(schoolFound)
                if (schoolFound) {
                    that.setState({
                        schoolFound : true,
                        userSchoolData : schoolFound
                    })
                } else {
                    that.setState({
                        schoolFound : false,
                        userSchoolData : schoolFound
                    })
                }
            });
        }).catch(function(err){
            console.log(err);
            that.setState({
                user : undefined
            })
        });
    }

    render() {
        return (
            this.state.school.school 
            ? 
            <Container>
                <Header>{this.state.school.school.name}</Header>
                <Row>
                    <Col xs="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(0)} active={this.state.activeTab[0]}>General Information</NavLink>
                            </NavItem>
                            {this.state.schoolFound ? 
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(1)} active={this.state.activeTab[1]}>My Notes</NavLink>
                            </NavItem>
                            : ""
                            }
                            {this.state.schoolFound ? 
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(2)} active={this.state.activeTab[2]}>Admissions Requirements</NavLink>
                            </NavItem>
                            : ""
                            }
                        </Nav>
                        <Card style={{borderTop:"none"}}>
                            {/* If there is no user signed in, clicking this should have you link to log in page;
                                If there is a user signed in, but this college is already in their list, this should be a link to remove college */}
                            {this.state.schoolFound 
                                ? 
                                <div>
                                    <span className="iconHolder" style={styles.icon} onClick={ ()=> this.deleteSchool(this.state.userSchoolData._id) }><i className="fa fa-times" aria-hidden="true"></i></span>
                                </div>
                                :
                                <div>
                                    <span className="iconHolder" style={styles.icon} onClick={ ()=> this.addSchool(this.state.school.id) } ><i className="fa fa-plus-square" aria-hidden="true"  title="Add school to dashboard"></i></span>
                                </div>
                            }
                            {this.state.activeTab[0] ?
                            <CardBody>
                            General info: <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
                            </CardBody>
                            : ""
                            }
                            {this.state.activeTab[1] ?
                            <CardBody>
                            My Notes: <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
                            </CardBody>
                            : ""
                            }
                            {this.state.activeTab[2] ?
                            <CardBody>
                            Admission Requirements: <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam dui. Ut sed tortor mattis, gravida lorem ut, posuere leo. Vestibulum commodo quis orci ut mattis. Maecenas eu neque sagittis, iaculis sem in, tempus odio. Quisque congue interdum elit, eu pharetra nisl luctus eu. Donec suscipit velit sapien, eu efficitur urna scelerisque nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel luctus quam. Nulla elementum vitae nisl sit amet maximus. Vivamus semper, ipsum ut tincidunt vehicula, justo dolor aliquet massa, at pellentesque turpis odio consectetur turpis. Nam elit mi, condimentum ut fermentum mollis, tempor ut dolor. Suspendisse in nulla posuere, elementum sem sit amet, vulputate tellus. Duis purus felis, fermentum vel faucibus eu, iaculis at metus. Nulla volutpat quam et interdum semper.
                            </CardBody>
                            : ""
                            }
                        </Card>
                    </Col>
                </Row>

            </Container>
            :
            <p style={{textAlign: "center", marginTop: "30px"}}>Retrieving school data. Please wait.</p>
            
        )
    }
}