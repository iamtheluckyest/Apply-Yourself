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
                <SearchResult 
                    collegeName="Northwestern University" 
                    location="Evanston, IL" 
                    avgTuition="$50,855"
                    url="http://www.northwestern.edu/"/>
                <SearchResult 
                    collegeName="Northwestern University" 
                    location="Evanston, IL" 
                    avgTuition="$50,855"
                    url="http://www.northwestern.edu/"/>
            </Col>
        </Row>
    </Container>;

