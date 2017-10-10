import React, {Component} from 'react';
import {Button, Container, Col, Row} from 'reactstrap';
import {Header} from "../components/Header";
import {DeleteButton, AddPref} from "../components/SetDefaultComponents";
import API from "../utils/API";
import  { Redirect } from 'react-router-dom';

const styles = {
    preferenceRow : {
        marginBottom: "40px"
    }
}

export class ChangeDefaults extends Component {
    state = {
        newReqFieldName: "",
        newNoteFieldName: "",
        defaultNotes: [],
        defaultAppRequirements: [],
        user: undefined,
        redirect: undefined
    }
    
    componentDidMount(){
        document.title = "Change Preferences";
        
        API.getUser()
        .then((res) => {
            console.log(res);
            this.setState({
                user : res.data,
                defaultNotes : res.data.defaultNoteFields,
                defaultAppRequirements : res.data.defaultAppRequirements
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                user : undefined
            });
        });
    }

    addNote = (arr, noteName) => {
        if(noteName){
            arr.push((noteName + ""));
            this.setState({
                defaultNotes : arr
            });
        }
    }

    addReq = (arr,reqName) => {
        if(reqName){
            arr.push((reqName + ""));
            this.setState({
                defaultAppRequirements : arr
            });
        }
    }

    handleInputChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            [name] : value,
        });
    }

    deleteNote = (index) => {
        let newNotes = this.state.defaultNotes;
        newNotes.splice(index,1);
        this.setState({
            defaultNotes : newNotes
        });
    }

    deleteReq = (index) => {
        let newReqs = this.state.defaultAppRequirements;
        newReqs.splice(index,1);
        this.setState({
            defaultAppRequirements : newReqs
        })
    }

    handleSubmit = event => {
        API.setDefaultCollegeReqs(this.state.defaultNotes)
        .then( res => {
            if(!res.data.error){
                API.setDefaultAppPrefs(this.state.defaultAppRequirements)
                .then( res2 => {
                    if(!res2.data.error){
                        console.log(res2);
                        console.log("successfully saved preferences");
                        this.setState({
                            "redirect" : <Redirect to='/search'/>
                        })  
                    } else {
                        alert("Could not save your preferences. " + res2.data.message);
                    }
                }).catch(err2=> {
                    console.log(err2);
                    alert("Could not save your preferences. Unknown error occurred.");
                });
            } else {
                alert("Could not save your preferences. " + res.data.message);
            }
        }).catch(err=> {
            console.log(err);
            alert("Could not save your preferences. Unknown error occurred.");
        })
    }

    render () {
        return (
            this.state.user
            ?
                this.state.redirect
                ?
                    this.state.redirect
                :
                    <Container style={{textAlign: "center"}}>
                        <Header>Change your Preferences</Header>
                        <p style={{marginBottom:"20px"}}>
                            Remove your previous default preferences by clicking on them. Add a new one by providing a new name for your preference and clicking 'Add.' Save your default preferences by clicking 'Save Preferences.'
                        </p>
                        <Row style={styles.preferenceRow}>
                            <Col xs="hidden" sm="2">
                            </Col>
                            <Col xs="12" sm="8">
                                <h3>College Preferences</h3>
                                <p>
                                    <em>Remove a default preference by clicking on it.</em>
                                </p>
                                {this.state.defaultNotes.map((pref, index) => {
                                    
                                    return (
                                        <DeleteButton 
                                            key={index}
                                            index={index}
                                            myName={pref}
                                            deleteMethod={this.deleteNote}
                                        />
                                    )
                                })}
                                <p style={{margin:"20px"}}>
                                    <em>Add another one!</em>
                                </p>
                                <AddPref name="newNoteFieldName" onChange={this.handleInputChange} fieldName={this.state.newNoteFieldName} arr={this.state.defaultNotes} addMyPref={this.addNote}/>
                            </Col>
                            <Col xs="hidden" sm="2">
                            </Col>
                        </Row>

                        <Row style={styles.preferenceRow}>
                            <Col xs="hidden" sm="2">
                            </Col>
                            <Col xs="12" sm="8">
                                <h3>Application Preferences</h3>
                                <p>
                                    <em>Remove a default preference by clicking on it.</em>
                                </p>
                                {this.state.defaultAppRequirements.map((req, index) => {
                                    return (
                                        <DeleteButton
                                            key={index}
                                            index={index}
                                            myName={req}
                                            deleteMethod={this.deleteReq}
                                        />
                                    )
                                })}
                                <p style={{margin:"20px"}}>
                                    <em>Add another one!</em>
                                </p>
                                <AddPref name="newReqFieldName" onChange={this.handleInputChange} fieldName={this.state.newReqFieldName} arr={this.state.defaultAppRequirements} addMyPref={this.addReq}/>
                            </Col>
                            <Col xs="hidden" sm="2">
                            </Col>
                        </Row>

                        <Row style={styles.preferenceRow}>
                            <Col xs="hidden" sm="2">
                            </Col>
                            <Col xs="12" sm="8">
                                <h2>Save Preferences</h2>
                                <Button onClick={this.handleSubmit}>
                                    Save Preferences
                                </Button>
                            </Col>
                            <Col xs="hidden" sm="2">
                            </Col>
                        </Row>
                        
                    </Container>
            :
                <div></div>
        )
    }
}