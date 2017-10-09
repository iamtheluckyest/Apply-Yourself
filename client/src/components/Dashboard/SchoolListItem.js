import React from "react";
import {Card, CardTitle, CardBody} from "reactstrap";

const styles= {
    cardTitle: {
        paddingRight: "40px"
    }
}

export const SchoolListItem = props => {
    // Get application deadline
    let appDeadline = props.schoolUserData.appRequirements.filter( requirement => requirement.name === "Application deadline" )[0]

    return (
        <Card className="mb-3">
            <CardBody>
                {console.log(props.schoolUserData)}
                <CardTitle style={styles.cardTitle}>{props.schoolAPIdata.school.name}</CardTitle>
                <span className="iconHolder" onClick={ ()=> props.deleteSchool(props.schoolUserData._id)}><i className="fa fa-times" aria-hidden="true"></i></span>
                <p>
                    <a href={"http://" + props.schoolAPIdata.school.school_url} target="_blank">{props.schoolAPIdata.school.school_url}</a>
                    <br />
                    {props.schoolAPIdata.school.city},  {props.schoolAPIdata.school.state} 
                    <br />
                    Application Deadline: { appDeadline ? appDeadline.value : "No deadline available"}
                </p>
            </CardBody>
        </Card>
    )
}