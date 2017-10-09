import React from "react";
import {Link} from "react-router-dom";
import {Card, CardTitle, CardBody} from "reactstrap";
import API from "../../utils/API";

const styles= {
    cardTitle: {
        paddingRight: "40px"
    }
}

export const SearchResult = props => 
    <Card className="mb-3">
        <CardBody>
            <Link to={"/school/" + props.id} ><CardTitle style={styles.cardTitle}>{props.collegeName}</CardTitle></Link>
            <span className="iconHolder"
                onClick={ () => { 
                    API.addSchool(props.id)
                    .then( res => console.log(res))
                    .catch(err=> console.log(err))
                }}
            ><i className="fa fa-plus-square" aria-hidden="true"></i></span>
            <p>
                <a href={"http://" + props.url} target="_blank">{props.url}</a>
                <br />
                State: {props.state} 
                <br />
                In-state Tuition: {props.inStateTuition}
                <br />
                Out-of-state Tuition: {props.outOfStateTuition}
            </p>
        </CardBody>
    </Card>
;