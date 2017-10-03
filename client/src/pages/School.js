import React from "react";
import {Link} from "react-router-dom"
import {Container, Row, Col} from "reactstrap";
import {Header} from "../components/Header";

const styles= {
    icon: {
        position: "absolute",
        top: "20px",
        right: "20px"
    }
}

/* Future functionality 
    On component mount:
*       - Call API to populate general fields
*       - If user is signed in, check db to see if school is in user's db
*           - If so, display user-generated info
*/

export const School = props => 
    <Container>
        <Header>{props.schoolName}</Header>
        <Row>
            <Col xs="12">
                <h3 style={styles.icon}><Link to="/"><i className="fa fa-plus-square" aria-hidden="true"></i></Link></h3>
            </Col>   
        </Row>
    </Container>