import React from 'react';
import  { Redirect } from 'react-router-dom'
import SignUpForm from '../components/Form/SignUpForm.js';
import axios from "axios";

export class SignUpPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            },
            redirect : undefined
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
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
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        let that = this;
        
        axios.post("/auth/signup", {
            "name" : this.state.user.name,
            "email" : this.state.user.email,
            "password" : this.state.user.password
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
                        "summary" : mySummary
                    }
                });
            } else {
                localStorage.setItem('successMessage', "Successful sign up. You may now login.");
                that.setState({
                    "errors" : {},
                    "redirect" : <Redirect to='/login'/>
                });
            }
        }).catch(function(err){
            console.log("Error submitting form.");
            console.log(err);
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
                    <SignUpForm
                        onSubmit={this.processForm}
                        onChange={this.changeUser}
                        errors={this.state.errors}
                        user={this.state.user}
                    />
        );
    }

}