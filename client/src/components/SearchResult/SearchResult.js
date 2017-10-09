import React from "react";
import {Card, CardTitle, CardBody} from "reactstrap";
import API from "../../utils/API";
import Auth from "../../Auth";

const styles= {
    cardTitle: {
        paddingRight: "40px"
    }
}

export const SearchResult = props => 
    <Card className="mb-3">
        <CardBody>
            <CardTitle style={styles.cardTitle}>{props.collegeName}</CardTitle>
            <span className="iconHolder"
                onClick={ () => { 
                    API.addSchool({
                        method: "post",
                        url: "/user/college",
                        headers: {
                            'Authorization' : `bearer ${Auth.getToken()}`
                        },
                        data: {
                            collegeApiId: props.id
                        }
                        
                    }).then( res => console.log(res))
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