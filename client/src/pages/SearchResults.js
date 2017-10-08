import React  from "react";
import {Container, Row, Col} from "reactstrap";
import {SearchResult} from "../components/SearchResult";
import {Header} from "../components/Header";

export const SearchResults = props => 

    <Container>
        <Row>
            <Col xs="12">
                <Header>Search Results</Header>
            </Col>
        </Row>
        <Row>
            <Col xs="12">
                {!props.results 
                    ? 
                        <p style={{textAlign: "center"}}>Sorry, we didn't find any results matching that search</p>
                    :
                        props.results.map(school => {
                            for (let Key in school) {
                                if (!school[Key]) {
                                    school[Key] = "Data not found"
                                };
                            }
                            return (
                                <SearchResult 
                                    key={school.id}
                                    id={school.id}
                                    collegeName={school["school.name"]} 
                                    state={school["school.state"]}
                                    inStateTuition={school["2015.cost.tuition.in_state"]}
                                    outOfStateTuition={school["2015.cost.tuition.out_of_state"]}
                                    url={school["school.school_url"]}
                                />
                            )
                        }
                    )                    
                }

                
            </Col>
        </Row>
    </Container>;

