import React from "react"
import {Col, Row} from "reactstrap"


const styles = {
    image: {
        width: "100%"
    }
}

// With prop imgRight set to "true", the image will float to the right of the text

export const TextImage = props => 
    <Row>
        <Col xs="12" sm="4" className={props.imgRight ? "push-sm-8" : ""}>
            <img style={styles.image} src={props.source} alt={props.alt}/>
        </Col>
        <Col xs="12" sm="8" className={props.imgRight ? "pull-sm-4" : ""}>
            <h2>{props.sectionTitle}</h2>
            <p>{props.children}</p>
        </Col>
    </Row>