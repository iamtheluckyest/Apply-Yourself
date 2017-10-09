import React, {Component} from 'react';
import {Row, Col} from "reactstrap";
import {Header} from "../Header";
import {SchoolListItem} from "../Dashboard";
import API from "../../utils/API";
import Auth from "../../Auth";

export class Dash extends Component {
    state = {
        schools: []
    }

    componentDidMount(){
        this.updateSchoolList();
    }

    updateSchoolList = () => {
        this.props.user.colleges.forEach( (school, index) => {
            this.getSchoolInfo(school.apiId, index);
        })
    }

    getSchoolInfo = (apiId, index) => {
        let authKey = "S9HBrRONDcEoZvlEQkn5ucv5bmWnMoRT5sjaWIJ8";
        let queryUrl = "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=" + authKey + "&id=" + apiId;
        return (
            API.getSchoolById(queryUrl)
                .then(res => {
                    let arr = this.state.schools;
                    arr[index] = res.data.results[0];
                    this.setState({schools: arr});
                })
                .catch(err => console.log(err))
        )
    }

    deleteSchool = collegeId => {
        API.deleteSchool({
            method: "delete",
            url: "/user/college",
            headers: {
                'Authorization' : `bearer ${Auth.getToken()}`
            },
            data: {
                collegeId: collegeId
            }
        }).then( () => {console.log("hi") 
            this.updateSchoolList()} )
        .catch(err=> console.log(err));
    }
    

    render() {

        let noColleges = false;
        let pleaseWait = false;
        if (!this.props.user.colleges.length)
            noColleges = true;
        else if ( !this.state.schools.length || (this.props.user.colleges.length !== this.state.schools.length) ) {
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
                                this.state.schools.map((school, index) => {
                                        return (
                                            <SchoolListItem 
                                                key={school.id}
                                                schoolAPIdata={school}
                                                schoolUserData={this.props.user.colleges[index]}
                                                deleteSchool={this.deleteSchool}
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
