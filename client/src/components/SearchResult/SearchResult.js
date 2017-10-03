import React from "react";
import {Link} from "react-router-dom"
import {Card, CardTitle, CardBlock} from "reactstrap";

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

export const SearchResult = props => 
    <Card className="mb-3">
        <CardBlock>
            <CardTitle style={styles.cardTitle}>{props.collegeName}</CardTitle>
            <h3 style={styles.icon}><Link to="/"><i className="fa fa-plus-square" aria-hidden="true"></i></Link></h3>
            <p>
                <a href={props.url} target="_blank">{props.url}</a>
                <br />
                Location: {props.location} 
                <br />
                Average Tuition: {props.avgTuition}
            </p>
        </CardBlock>
    </Card>
;