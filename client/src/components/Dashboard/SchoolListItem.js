import React from "react";
import {Link} from "react-router-dom"
import {Card, CardTitle, CardBody} from "reactstrap";

const styles= {
    icon: {
        position: "absolute",
        top: "20px",
        right: "20px"
    },
    cardTitle: {
        paddingRight: "40px"
    }
}

export const SchoolListItem = props => 
    <Card className="mb-3">
        <CardBody>
            {console.log(props.school)}
            <CardTitle style={styles.cardTitle}>{props.school.school.name}</CardTitle>
            <h3 style={styles.icon}><Link to="/"><i className="fa fa-plus-square" aria-hidden="true"></i></Link></h3>
            <p>
                {props.id}
            </p>
        </CardBody>
    </Card>
;