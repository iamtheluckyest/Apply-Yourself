import React from 'react';
import {Row, Col} from "reactstrap";
import {Header} from "../Header";
import {SchoolListItem} from "../Dashboard";

export const Dash = props => {

    let noColleges = false;
    let pleaseWait = false;
    console.log(props.schools.length)
    console.log(props.user.colleges.length)
    if (!props.user.colleges.length)
        noColleges = true;
    else if ( !props.schools.length || (props.user.colleges.length !== props.schools.length) ) {
        pleaseWait = true;
    }

    return (
        <div>
            <Header>My Schools</Header>
            <Row>
                <Col xs="12">
                    { noColleges 
                        ? 
                        <p style={{textAlign: "center"}}>
                            It seems you don't have any colleges saved. 
                            <br />
                            Search for colleges, then click on the "plus" button to save them.
                        </p>
                        : pleaseWait 
                            ?
                            <p style={{textAlign: "center"}}>
                                Please wait while your colleges load.
                            </p> 
                            :
                            props.schools.map((school, index) => {
                                    return (
                                        <SchoolListItem 
                                            key={school.id}
                                            schoolAPIdata={school}
                                            schoolUserData={props.user.colleges[index]}
                                            deleteSchool={props.deleteSchool}
                                        >
                                        </SchoolListItem>
                                    )
                                }
                            )                    
                    }
                </Col>
            </Row>
        </div>
    )
}

