import React, {Component}  from "react";
import {Container, Row, Col} from "reactstrap"
import {SearchForm} from "../components/Form"
import {Header} from "../components/Header"

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
        console.log(this.state.schoolName)        
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

