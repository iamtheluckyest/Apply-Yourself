import React, {Component} from "react";
import  { Redirect } from 'react-router-dom';
import {Container, Row, Col} from "reactstrap";
import Auth from "../Auth.js";
import axios from "axios";
import {Header} from "../components/Header";
import {LoginForm} from "../components/Form";


export class LoginPage extends Component {

    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        // set the initial component state
        this.state = {
            errors: {},
            redirect : undefined,
            successMessage,
            user: {
                email: '',
                password: ''
            }
        };
        

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        let that = this;
        
        axios.post("/auth/login", {
            "email" : that.state.user.email,
            "password" : that.state.user.password
        }).then(function(res){
            console.log("Normal response");
            console.log(res);
            if(!res.data.success){
                let mySummary = res.data.message;
                if(res.data.errors){
                    for(let key in res.data.errors){
                        mySummary += (" " + res.data.errors[key])
                    }
                }
                that.setState({
                    "errors" : {
                        summary : mySummary
                    }
                });
            } else {
                //token comes from the post login route from server
                Auth.authenticateUser(res.data.token);//client side
                that.setState({
                    "errors" : {},//just in case
                    "redirect" : <Redirect to='/dashboard'/>
                });
            }
        }).catch(function(err){
            console.log("Error submitting form");
            console.log(err);
        });
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            this.state.redirect
                ?
                    this.state.redirect
                :   
                    <Container>
                        <Header>Log In</Header>
                        <Row>
                            <Col xs="hidden" sm="2"></Col>
                            <Col xs="12" sm="8">
                            <LoginForm
                                onSubmit={this.processForm}
                                onChange={this.changeUser}
                                errors={this.state.errors}
                                successMessage = {this.state.successMessage}
                                user={this.state.user}
                            />
                            </Col>
                            <Col xs="hidden" sm="2"></Col>
                        </Row>
                    </Container>
        );
    }

}