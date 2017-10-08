import React, {Component} from 'react';
import {Button, Container, Col, Row} from 'reactstrap';
import {Header} from "../components/Header";
import {AddButton, PrefButton} from "../components/SetDefaultComponents";

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
            selectedArr.push(this.state["sample" + PrefsArr][index]);
        } 
        // If choice has already been selected, toggle button to inactive 
        // and remove choice from selected prefs array
        else {
            activeArr[index] = false;
        }

        // Update state.
        this.setState({
            active: activeArr,
            ["selected" + PrefsArr]: selectedArr
        }, () => console.log(this.state.active))
    }

    handleSubmit = event => {
        
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
                            <br />
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