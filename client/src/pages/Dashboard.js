import React, {Component} from "react";
import {Container} from "reactstrap"
import {Dash} from "../components/Dashboard";
import Auth from "../Auth.js";
import API from "../utils/API";
import axios from "axios";

export class Dashboard extends Component {
    state = {
        user : undefined,
        schools: []
    }

    componentDidMount() {
        document.title = "Dashboard"
        this.getUser();
    }

    getUser =() => {
        let that = this;
        axios({
            url : '/user',
            method : "get",
            headers: {
                'Authorization' : `bearer ${Auth.getToken()}`
            },
        }).then(function(res){
            console.log(res);
            that.setState({
                user : res.data
            }, () => that.updateSchoolList());
        }).catch(function(err){
            console.log(err);
            that.setState({
                user : undefined
            } )
        });
    }

    updateSchoolList = () => {
        // Stores only the school data
        this.setState({schools: []}, 
            this.state.user.colleges.forEach( (school, index) => {
                this.getSchoolInfo(school.apiId, index);
            })
        )
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
        }).then( () => this.getUser() )
        .catch(err=> console.log(err));
    }
    

    render() {
        console.log("state is: ");
        console.log(this.state);
        return (
            <Container>
                {
                    this.state.user 
                    ?
                    <Dash user={this.state.user} schools={this.state.schools} deleteSchool={this.deleteSchool}/>   
                    : 
                    <p style={{textAlign: "center", marginTop: "30px"}}>Sorry, you must be logged in to access this content.</p>
                }
            </Container>
        )
    }
}

