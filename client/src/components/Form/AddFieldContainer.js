import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import axios from "axios";
import {Header} from "../Header";
import {AddFieldForm} from "../Form";


export class AddFieldContainer extends Component {

    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            fieldName : "",
            fieldValue : "",
        };
        

        this.processForm = this.processForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        
        axios.post("/user/requirement", {
            "fieldName" : this.state.fieldName,
            "fieldValue" : this.state.fieldValue,
            "collegeApiId" : 1
        }).then(function(res){
            console.log(res); 
        }).catch(function(err){
            console.log("Error submitting form");
            console.log(err);
        });
    }

    handleInputChange(event) {
        // Getting the value and name of the input which triggered the change
        const value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
            [name]: value,
        });
    };

    /**
     * Render the component.
     */
    render() {
        return (
            <Container>
                <Header>Add a Field</Header>
                <Row>
                    <Col xs="hidden" sm="2"></Col>
                    <Col xs="12" sm="8">
                        <AddFieldForm
                            onChange={this.handleInputChange}
                            nameField={this.fieldName}
                            valueField={this.fieldValue}
                            onSubmit={this.processForm}
                        />
                    </Col>
                    <Col xs="hidden" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}