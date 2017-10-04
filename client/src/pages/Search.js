import React, {Component}  from "react";
import {Container, Row, Col} from "reactstrap"
import {SearchForm} from "../components/Form"
import {Header} from "../components/Header"

export class Search extends Component {
    state = {
        // API call names: schoolName, schoolId, schoolLocation, underGraduatePopulation, graduatePopulation, inStateTuition, outStateTuition, completionRate2, completionRate4, salary6, salary10, averageSAT
        schoolName : "",
        // schoolId : "",
        location : "",
        // schoolLocation : "",
        minPopulation : "",
        // underGraduatePopulation : "",
        // graduatePopulation : "",
        maxPopulation : "",
        minTuition : "",
        // inStateTuition : "",
        // outStateTuition : "",
        maxTuition : "",
        minCompletion : ""
        // completionRate2 : "",
        // completionRate2 : "",
        // salary6 : ",,
        // salary10 : ",,
        // averageSAT : ""     
    }

    handleInput = event => {
        const {name, value} = event.target
        this.setState(
            {[name]: value}
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.schoolName)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.schoolId)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.schoolLocation)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.underGraduatePopulation)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.garduatePopulation)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.inStateTuition)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.outStateTuition)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.completionRate2)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.completionRate4)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.salary6)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.salary10)        
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.averageSAT)        
    }

    render() {
        return (
            <Container>
                <Header>Search for a College</Header>
                <Row>
                    <Col xs="hidden" sm="2">
                    </Col>
                    <Col xs="12" sm="8">
                        <SearchForm handleInput={this.handleInput} handleSubmit={this.handleSubmit}/>
                    </Col>
                    <Col xs="hidden" sm="2">
                    </Col>
                </Row>
            </Container>
        )
    }
}

