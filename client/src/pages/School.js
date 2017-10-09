import React, {Component} from "react";
import {Container, Col, Row } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Card, CardBody} from 'reactstrap';
import {Header} from "../components/Header";
import {Field} from "../components/School"
import API from "../utils/API"

const styles= {
    icon: {
        position: "absolute",
        top: "-52px",
        right: "-20px"
    }
}

export class School extends Component {
    state = {
        activeTab : [],
        user : undefined,
        schoolApiData : {},
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
            this.setState({schoolApiData: res.data.results[0]});
        }).catch(err => console.log(err))

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
                        schoolUserData : schoolFound
                    })
                } else {
                    that.setState({
                        schoolFound : false,
                        schoolUserData : schoolFound
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

    /**
     * Functions associated with updating Field component
     */

    handleInput = event => {
        let {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (field, event) => {
        event.preventDefault();
        if (this.state[field._id]) {
            API.updateNote({
                collegeId : this.state.schoolUserData._id,
                fieldId : field._id,
                fieldName : field.name,
                fieldValue : field.value
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }

    /**
     * Functions that decode College Scorecard Data
     */

    determineLocale = () => {
        let locale;
        switch (this.state.schoolApiData.school.locale) {
            case 11 || 12 || 13 : locale = "City"; break;
            case 21 || 22 || 23 : locale = "Suburb"; break;
            case 31 || 32 || 33 : locale = "Town"; break;
            case 41 || 42 || 43 : locale = "Rural"; break;
            default: locale = null;
        }
        return locale
    }

    determineSize = () => {
        let size;
        switch(this.state.schoolApiData.school.carnegie_size_setting){
            case 1 : size = "two-year, very small"; break;
            case 2 : size = "two-year, small"; break;
            case 3 : size = "two-year, medium"; break;
            case 4 : size = "two-year, large"; break;
            case 5 : size = "two-year, very large"; break;
            case 6 : size = "four-year, very small, primarily nonresidential"; break;
            case 7 : size = "four-year, very small, primarily residential"; break;
            case 8 : size = "four-year, very small, highly residential"; break;
            case 9 : size = "four-year, small, primarily nonresidential"; break;
            case 10 : size = "four-year, small, primarily residential"; break;
            case 11	: size = "four-year, small, highly residential"; break;
            case 12	: size = "four-year, medium, primarily nonresidential"; break;
            case 13	: size = "four-year, medium, primarily residential"; break;
            case 14	: size = "four-year, medium, highly residential"; break;
            case 15	: size = "four-year, large, primarily nonresidential"; break;
            case 16	: size = "four-year, large, primarily residential"; break;
            case 17	: size = "four-year, large, highly residential"; break;
            case 18	: size = "exclusively graduate/professional"; break;
            default : size = "";
        }
        return size;
    }

    render() {
        let {schoolApiData, schoolUserData, activeTab} = this.state;
        
        return (
            schoolApiData.school 
            ? 
            <Container>
                <Header>{schoolApiData.school.name}</Header>
                <Row>
                    <Col xs="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(0)} active={activeTab[0]}>General Information</NavLink>
                            </NavItem>
                            {this.state.schoolFound ? 
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(1)} active={activeTab[1]}>My Notes</NavLink>
                            </NavItem>
                            : ""
                            }
                            {this.state.schoolFound ? 
                            <NavItem>
                                <NavLink href="#" onClick={() => this.changeActiveTab(2)} active={activeTab[2]}>Admissions Requirements</NavLink>
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
                                    <span className="iconHolder" style={styles.icon} onClick={ ()=> this.deleteSchool(schoolUserData._id) }><i className="fa fa-times" aria-hidden="true" title="Remove school from dashboard"></i></span>
                                </div>
                                :
                                <div>
                                    <span className="iconHolder" style={styles.icon} onClick={ ()=> this.addSchool(schoolApiData.id) } ><i className="fa fa-plus-square" aria-hidden="true"  title="Add school to dashboard"></i></span>
                                </div>
                            }
                            {activeTab[0] ?
                            <CardBody>
                                <h4>Overview</h4>
                                <a href={"http://" + schoolApiData.school.school_url} target="_blank">{schoolApiData.school.school_url}</a>
                                <p>{schoolApiData.school.name} is&nbsp;
                                    {(schoolApiData.school.carnegie_size_setting 
                                    && schoolApiData.school.carnegie_size_setting > 0 
                                    && schoolApiData.school.carnegie_size_setting < 19)
                                    ?
                                    <span>a {this.determineSize()} school </span>
                                    : 
                                    "" }
                                    located in {schoolApiData.school.city}, {schoolApiData.school.state}.
                                </p>
                                <h4>Statistics</h4>
                                <p>
                                    {this.determineLocale() ? <span>Locale: {this.determineLocale()} </span> : ""}
                                </p>
                            </CardBody>
                            : ""
                            }
                            {activeTab[1] ?
                            <CardBody>
                                <h4>My Notes</h4>
                                <p>
                                    {schoolUserData.notes.map( (note, index) =>
                                        <Field key={note._id} field={note} handleInput={this.handleInput} handleSubmit={this.handleSubmit} />
                                    )}
                                </p>
                            </CardBody>
                            : ""
                            }
                            {activeTab[2] ?
                            <CardBody>
                                <h4>Application Requirements</h4>
                                <p>
                                    {schoolUserData.appRequirements.map( (appReq, index) =>
                                        <Field key={appReq._id} field={appReq} handleInput={this.handleInput} handleSubmit={this.handleSubmit} />
                                    )}
                                </p>
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