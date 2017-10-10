import React  from "react";
import {Container, Row, Col} from "reactstrap";
import {SearchResult} from "../components/SearchResult";
import {Header} from "../components/Header";
import {Title} from "../components/Layout";

export const SearchResults = props => 
    <div>
        <Title title="Search Results"/>
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
                                    <SearchResult key={school.id} school={school}/>
                                )
                            }
                        )                    
                    }
                </Col>
            </Row>
        </Container>;
    </div>
