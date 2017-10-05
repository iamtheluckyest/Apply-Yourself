import React, {Component}  from "react";
import {Container, Row, Col} from "reactstrap"
import {SearchForm} from "../components/Form"
import {Header} from "../components/Header"
import API from "../utils/API"

export class Search extends Component {
    state = {
        schoolName : "",
        location : "",
        minPopulation : "",
        maxPopulation : "",
        minTuition : "",
        maxTuition : "",
        minCompletion : ""
    }

    handleInput = event => {
        const {name, value} = event.target
        this.setState(
            {[name]: value}
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        let authKey = "S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8";
        let queryURLBase = "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=" + authKey + "&_fields=id,school.name,school.state,2015.cost.tuition.in_state,2015.cost.tuition.out_of_state";
        let queryURL;

        if (this.state.location){
            queryURL = queryURLBase + "&school.state=" + this.state.location;
        }

        if (this.state.schoolName){
            queryURL = (queryURL || queryURLBase) + "&school.name=" + this.state.schoolName;
        }
            // if (this.state.startYear) {
            //     queryURL = queryURL + "&begin_date=" + this.state.startYear + "0101";
            // }
        
            // if (this.state.endYear) {
            //     queryURL = queryURL + "&end_date=" + this.state.endYear + "0101";
            // }

        // TODO check with Jeff, is this async?
        if (queryURL) {
            API.getSchools(queryURL)
                .then(res => {
                    console.log(res)  
                }).catch(err => console.log(err))

        }
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

