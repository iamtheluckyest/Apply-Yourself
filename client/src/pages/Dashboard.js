import React, {Component} from "react";
import {Container} from "reactstrap"
import {Dash} from "../components/Dashboard";
import API from "../utils/API";

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
        API.getUser()
        .then(function(res){
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
        // Stores the school data from the API for each school
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
        API.deleteSchool(collegeId)
        .then( () => this.getUser() )
        .catch(err=> console.log(err));
    }
    

    render() {
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

