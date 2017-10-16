import React, {Component} from "react";
import {Container, Col, Row, Table} from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Card, CardBody, CardFooter} from 'reactstrap';
import {Header} from "../components/Header";
import {LoginPrompt} from "../components/Modals";
import {Field, AddField, GeneralInfo} from "../components/School";
import API from "../utils/API";

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
        schoolUserData : {},
        modal : false
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
            this.setState({schoolApiData: res.data.results[0]}, 
                () => document.title = this.state.schoolApiData.school.name
            );
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

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    /**
     * Functions associated with updating Field component
     */

    setStartText = (name, startText) => {
        this.setState({
            [name] : startText
        })
    }

    deleteField = (fieldId, note) => {
        // If it's a note
        if (note) {
            let queryObj = {
                collegeId : this.state.schoolUserData._id,
                fieldId : fieldId
            }
            console.log(queryObj)
            API.deleteNote(queryObj)
            .then( () => this.getUser() )
            .catch(err => console.log(err))
        } 
        // If it's an admissions req
        else {
            let queryObj = {
                collegeApiId : this.state.schoolUserData.apiId,
                fieldId : fieldId
            }

            API.deleteAppReq(queryObj)
            .then( () => this.getUser() )
            .catch(err => console.log(err))
        }
    }

    handleInput = event => {
        let {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (field, note) => {
        let queryObj = {
            collegeId : this.state.schoolUserData._id,
            fieldId : field._id,
            fieldName : field.name,
            fieldValue : this.state[field._id]
        }
        if (this.state[field._id]) {
            // If it's a note
            if (note) {
                console.log("it's a note")
                API.updateNote(queryObj)
                .then( () => this.getUser() )
                .catch(err => console.log(err))
            } 
            // If it's an admissions requirement
            else {
                console.log("it's an app Req")
                API.updateAppReq(queryObj)
                .then( () => this.getUser() )
                .catch(err => console.log(err))
            }
        } 
    }

    addNewField = (fieldName, fieldValue, note) => {
        console.log("adding new field")
        let queryObj = {
            collegeId : this.state.schoolUserData._id,
            fieldName : fieldName,
            fieldValue : fieldValue
        }
        // If it's a note
        if (note) {
            API.addNewNote(queryObj)
            .then( () => this.getUser() )
            .catch(err => console.log(err))
        } 
        // If it's an admissions requirement
        else {
            API.addNewAppReq(queryObj)
            .then( () => this.getUser() )
            .catch(err => console.log(err))
        }
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
                        <Card style={{borderTop:"none"}} className="mb-5">
                            {/* If there is no user signed in, clicking opens modal which tells user to log in first;
                                If there is a user signed in, this button adds/deletes college from user's schools */}
                            {this.state.user 
                                ?
                                this.state.schoolFound 
                                    ? 
                                    <div>
                                        <span className="iconHolder" style={styles.icon} onClick={ ()=> this.deleteSchool(schoolUserData._id) }><i className="fa fa-times" aria-hidden="true" title="Remove school from dashboard"></i></span>
                                    </div>
                                    :
                                    <div>
                                        <span className="iconHolder" style={styles.icon} onClick={ ()=> this.addSchool(schoolApiData.id) } ><i className="fa fa-plus-square" aria-hidden="true"  title="Add school to dashboard"></i></span>
                                    </div>
                                :
                                <div>
                                    <span className="iconHolder" style={styles.icon} onClick={this.toggle} ><i className="fa fa-plus-square" aria-hidden="true"  title="Add school to dashboard"></i></span>
                                    <LoginPrompt modal={this.state.modal} toggle={this.toggle}/>
                                </div>
                            }
                            {activeTab[0] 
                            ?
                                <GeneralInfo data={schoolApiData} />
                            : 
                                ""
                            }
                            {activeTab[1] ?
                            <CardBody>
                                <h4 className="school-sub-header">My Notes</h4>
                                <Table className="mb-3">
                                    <tbody>
                                    {schoolUserData.notes.map( (note, index) =>
                                        <Field 
                                            key={note._id} 
                                            field={note} 
                                            note={true} 
                                            handleInput={this.handleInput} 
                                            handleSubmit={this.handleSubmit}
                                            setStartText={this.setStartText} 
                                            deleteField={this.deleteField}
                                            value={this.state[note._id]}
                                        />
                                    )}
                                    </tbody>
                                </Table>
                                <AddField addNewField={this.addNewField} note={true} />
                            </CardBody>
                            : ""
                            }
                            {activeTab[2] ?
                            <CardBody>
                                <h4  className="school-sub-header">Admissions Requirements</h4>
                                <Table>
                                    <tbody>
                                    {schoolUserData.appRequirements.map( (appReq, index) =>
                                        <Field 
                                            key={appReq._id} 
                                            field={appReq} 
                                            note={false} 
                                            handleInput={this.handleInput} 
                                            handleSubmit={this.handleSubmit}
                                            setStartText={this.setStartText}
                                            deleteField={this.deleteField}                                            
                                            value={this.state[appReq._id]}
                                        />
                                    )}
                                    </tbody>
                                </Table>
                                <AddField addNewField={this.addNewField} note={false} />
                            </CardBody>
                            : ""
                            }
                            {activeTab[0] 
                            ?
                                <CardFooter>
                                    Information provided by <a href="https://collegescorecard.ed.gov/data/" target="_blank" rel="noopener noreferrer">College Scorecard.</a>
                                    <br />
                                    Please refer to <a href={"http://" + schoolApiData.school.school_url} target="_blank" rel="noopener noreferrer">school website</a> for more complete and up-to-date information.
                                    <br />
                                    All information from 2015 unless otherwise noted.
                                </CardFooter>
                            : 
                                ""
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