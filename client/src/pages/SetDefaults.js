import React, {Component} from 'react';
import {Button, Container, Col, Row} from 'reactstrap';
import {Header} from "../components/Header";
import {AddButton, PrefButton} from "../components/SetDefaultComponents";
import API from "../utils/API";
import Auth from "../Auth";

const styles = {
    preferenceRow : {
        marginBottom: "40px"
    }
}

export class SetDefaults extends Component {
    state = {
        sampleCollegePrefs : ["Campus", "In-state", "Distance from home", "Weather", "Sports teams", "Overall vibe"],
        sampleAppPrefs : ["Application deadline", "Early application deadline", "# of teacher recommendations", "Accepts Common App?", "Application Fee", "Essay Prompt"],
        selectedCollegePrefs : [],
        selectedAppPrefs : [],
        active: []
    }
    
    componentDidMount(){
        document.title = "Default Preferences"
    }

    addToSamplePrefs = (sampleArray, newCriterion) => {
        let arr = this.state[sampleArray]
        arr.push(newCriterion)
        this.setState({
            [sampleArray] : arr
        })
    }

    selectPref = (index, PrefsArr) => {
        // Get current values of arrays from state so they can be manipulated
        let activeArr = this.state.active;
        let selectedArr = this.state["selected" + PrefsArr];

        // If choice has not already been selected, toggle button to active 
        // and add choice to selected prefs array
        if (!this.state.active[index]) {
            activeArr[index] = true;
            if (PrefsArr === "CollegePrefs") {
                selectedArr.push(this.state["sample" + PrefsArr][index]);
            // Need to correct for the index which was changed to allow for different keys/ids
            } else {
                selectedArr.push(this.state["sample" + PrefsArr][index - this.state.sampleCollegePrefs.length]);
            }
        } 
        // If choice has already been selected, toggle button to inactive 
        // and remove choice from selected prefs array
        else {
            activeArr[index] = false;
            let foundIndex;
            if (PrefsArr === "CollegePrefs") {
                foundIndex = selectedArr.indexOf(this.state["sample" + PrefsArr][index]);
            // Need to correct for the index which was changed to allow for different keys/ids
            } else {
                foundIndex = selectedArr.indexOf(this.state["sample" + PrefsArr][index - this.state.sampleCollegePrefs.length]);
            }            
            selectedArr.splice(foundIndex, 1)
        }

        // Update state.
        this.setState({
            active: activeArr,
            ["selected" + PrefsArr]: selectedArr
        }, () => console.log(this.state))
    }

    handleSubmit = event => {
        API.setDefaultCollegeReqs({
            method: "post",
            url: "/user/default_notes",
            headers: {
                'Authorization' : `bearer ${Auth.getToken()}`
            },
            data: {
                noteFields: this.state.selectedCollegePrefs
            }
        }).then( res => {
            console.log(res)
            if(!res.data.error){
                API.setDefaultAppPrefs({
                    method: "post",
                    url: "/user/default_requirements",
                    headers: {
                        'Authorization' : `bearer ${Auth.getToken()}`
                    },
                    data: {
                        appRequirements: this.state.selectedAppPrefs
                    }    
                }).then( res2 => {
                    console.log(res2)
                    if(!res2.data.error){
                        console.log("successfully saved preferences");
                        console.log(res2);
                    } else {
                        alert("Could not save your preferences. " + res2.data.message);
                    }
                }).catch(err2=> {
                    console.log(err2)
                });
            } else {
                alert("Could not save your preferences. " + res.data.message);
            }
        }).catch(err=> {
            console.log(err)
        })
    }

    render () {
        return (
            <Container style={{textAlign: "center"}}>
                <Header>Select your Preferences</Header>
                <Row style={styles.preferenceRow}>
                    <Col xs="hidden" sm="2">
                    </Col>
                    <Col xs="12" sm="8">
                        <h3>College preferences</h3>
                        <p>
                            While we can provide general information such as tuition or student body population for each college, 
                            you might have unique criteria that determines whether or not a school is a good fit for you.
                        </p>
                        <p>
                            <em>Choose the criteria that matter to you.</em>
                        </p>
                        {this.state.sampleCollegePrefs.map((pref, index) => {
                            
                            return (
                                <PrefButton 
                                    key={index}
                                    index={index}
                                    selectPref = {this.selectPref}
                                    currentElement = {this.state.active[index]}
                                    PrefsArr = "CollegePrefs"
                                >
                                        {pref}
                                </PrefButton>
                            )
                        })}
                        <p style={{margin:"20px"}}>
                            <em>Or add your own!</em>
                        </p>
                        <AddButton fieldName="NewCollegeCriterion" sampleArray="sampleCollegePrefs" addToSamplePrefs={this.addToSamplePrefs}/>
                    </Col>
                    <Col xs="hidden" sm="2">
                    </Col>
                </Row>

                <Row style={styles.preferenceRow}>
                    <Col xs="hidden" sm="2">
                    </Col>
                    <Col xs="12" sm="8">
                        <h3>Application preferences</h3>
                        <p>
                            Are there application fields that you want to make sure you remember for every college?
                        </p>
                        <p>
                            <em>Choose the application information that matters to you.</em>
                        </p>
                        {this.state.sampleAppPrefs.map((pref, index) => {
                            index += this.state.sampleCollegePrefs.length;
                            return (
                                <PrefButton
                                    key={index}
                                    index={index}
                                    selectPref = {this.selectPref}
                                    currentElement = {this.state.active[index]}
                                    PrefsArr = "AppPrefs"
                                >
                                    {pref}
                                </PrefButton>
                            )
                        })}
                        <p style={{margin:"20px"}}>
                            <em>Or add your own!</em>
                        </p>
                        <AddButton fieldName="NewAppCriterion" sampleArray="sampleAppPrefs" addToSamplePrefs={this.addToSamplePrefs}/>
                    </Col>
                    <Col xs="hidden" sm="2">
                    </Col>
                </Row>

                <Row style={styles.preferenceRow}>
                    <Col xs="hidden" sm="2">
                    </Col>
                    <Col xs="12" sm="8">
                        <h2>Save Preferences</h2>
                        <p>You can always change them later.</p>
                        <Button onClick={this.handleSubmit}>
                            Save Preferences
                        </Button>
                    </Col>
                    <Col xs="hidden" sm="2">
                    </Col>
                </Row>
                
            </Container>
        )
    }
}