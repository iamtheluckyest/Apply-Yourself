import React from "react";
import {Row, Col} from "reactstrap"
const styles = {
    margin: "40px auto 60px auto",
    fontSize : "3em",
    textAlign: "center"
}

export const Header = props => 
    <Row>
        <Col xs="12">
            <h1 style={styles}>{props.children}</h1>
        </Col>
    </Row>
;