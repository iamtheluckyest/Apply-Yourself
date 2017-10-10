import React, {Component}  from "react";
import {Redirect} from "react-router-dom";
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
        inState : "",
        redirect: false
    }

    componentDidMount() {
        document.title = "Search"
        this.setState({redirect:false})
    }

    handleInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(
            {[name]: value}
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        let authKey = "S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8";
        let queryURLBase = "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=" + authKey + "&_fields=id,school.name,school.school_url,school.state,school.city,2015.cost.tuition.in_state,2015.cost.tuition.out_of_state";
        let queryURL;

        if (this.state.location){
            queryURL = queryURLBase + "&school.state=" + this.state.location;
        }

        if (this.state.schoolName){
            queryURL = (queryURL || queryURLBase) + "&school.name=" + this.state.schoolName;
        }

        if (this.state.minPopulation && this.state.maxPopulation) {
            queryURL = (queryURL || queryURLBase) + "&2015.[INSERT POPULATION CALL]__range=" + this.state.minPopulation + ".." + this.state.maxPopulation;
        } else if (this.state.minPopulation) {
            queryURL = (queryURL || queryURLBase) + "&2015.[INSERT POPULATION CALL]__range=" + this.state.minPopulation + "..";
        } else if (this.state.maxPopulation) {
            queryURL = (queryURL || queryURLBase) + "&2015.[INSERT POPULATION CALL]__range=0.." + this.state.maxPopulation;
        };

        if(this.state.inState === true) {
            if (this.state.minTuition && this.state.maxTuition) {
                queryURL = (queryURL || queryURLBase) + "&2015.cost.tuition.in_state__range=" + this.state.minTuition + ".." + this.state.maxTuition;
            } else if (this.state.minTuition) {
                queryURL = (queryURL || queryURLBase) + "&2015.cost.tuition.in_state__range=" + this.state.minTuition + "..";
            } else if (this.state.maxTuition) {
                queryURL = (queryURL || queryURLBase) + "&2015.cost.tuition.in_state__range=0.." + this.state.maxTuition;
            }; 
        } else {
            if (this.state.minTuition && this.state.maxTuition) {
                queryURL = (queryURL || queryURLBase) + "&2015.cost.tuition.out_of_state__range=" + this.state.minTuition + ".." + this.state.maxTuition;
            } else if (this.state.minTuition) {
                queryURL = (queryURL || queryURLBase) + "&2015.cost.tuition.out_of_state__range=" + this.state.minTuition + "..";
            } else if (this.state.maxTuition) {
                queryURL = (queryURL || queryURLBase) + "&2015.cost.tuition.out_of_state__range=0.." + this.state.maxTuition;
            }; 
        }  

        if (queryURL) {
            API.getSchools(queryURL)
                .then(res => {
                    let that = this;
                    this.props.setSearchResults(res.data.results, () =>
                        that.setState({redirect:true})
                    )
                }).catch(err => console.log(err))
        }
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/searchResults"/>
            )
        } else {
            return (
                <Container>
                    <Header>Search for a College</Header>
                    <Row>
                        <Col xs="hidden" sm="2">
                        </Col>
                        <Col xs="12" sm="8">
                            <SearchForm 
                                handleInput={this.handleInput}
                                handleSubmit={this.handleSubmit}
                                inState={this.state.inState}
                            />
                        </Col>
                        <Col xs="hidden" sm="2">
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

