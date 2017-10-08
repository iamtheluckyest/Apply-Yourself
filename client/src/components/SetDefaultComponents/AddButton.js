import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap"

export class AddButton extends Component {
    state = {
        [this.props.fieldName] : ""
    }
    
    handleInput = event => {
        const {name, value} = event.target
        this.setState(
            {[name]: value}
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addToSamplePrefs(this.props.sampleArray, this.state[this.props.fieldName])
    }

    render() {  
        return (
            <Form>
                <FormGroup>
                    <Input style={{width:"150px", margin:"auto", display:"inline"}} name={this.props.fieldName} onChange={this.handleInput} placeholder="New criterion"/>
                    <Button style={{margin:"-5px auto auto 10px"}} onClick={this.handleSubmit}>Add</Button>
                </FormGroup>
            </Form>
        )
    }
}