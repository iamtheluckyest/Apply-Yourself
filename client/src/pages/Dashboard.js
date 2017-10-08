import React, {Component} from "react";
import {Container} from "reactstrap"
import {Dash} from "../components/Dashboard";
import Auth from "../Auth.js";
import axios from "axios";

export class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            user : undefined
        }
    }

    /**
     * This method will be executed after initial rendering.
     */
    componentDidMount() {
        document.title = "Dashboard"
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
            });
        }).catch(function(err){
            console.log(err);
            that.setState({
                user : undefined
            })
        });
    }

    render() {
        console.log("state is: ");
        console.log(this.state);
        return (
            <Container>
                {
                    this.state.user 
                    ?
                    <Dash user={this.state.user}/>   
                    : 
                    <p style={{textAlign: "center", marginTop: "30px"}}>Sorry, you must be logged in to access this content.</p>
                }
            </Container>
        )
    }
}

