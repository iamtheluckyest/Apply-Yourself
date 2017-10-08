import React, {Component} from 'react';
import {Row, Col} from "reactstrap";
import {Header} from "../Header";
import {SchoolListItem} from "../Dashboard";
import API from "../../utils/API";

export class Dash extends Component {
    state = {
        schools: []
    }

    getSchoolInfo = apiId => {
        let authKey = "S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8";
        let queryUrl = "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=" + authKey + "&id=" + apiId;

        API.getSchoolById(queryUrl)
            .then(res => {
                let arr = this.state.schools
                arr.push(res);
                this.setState({schools : arr})
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Header>My Schools</Header>
                <Row>
                    <Col xs="12">
                        {!this.props.user.colleges 
                            ? 
                                <p style={{textAlign: "center"}}>
                                    It seems you don't have any colleges saved. 
                                    <br />
                                    Search for colleges, then click on the "plus" button to save them.
                                </p>
                            :
                                this.props.user.colleges.map((school, index) => {
                                    this.getSchoolInfo(school.apiId, index)
                                    return (
                                        <SchoolListItem 
                                            id={school.apiId}
                                            school={this.state.school[index]}
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
}
