import React, {Component} from "react";
import {Button, Input} from "reactstrap"

const styles = {
    icon : {
        position: "static"
    },
    name : {
        width: "150px",
        padding: "2px 8px",
        display: "inline",
        marginRight: "20px",
        marginBottom: "20px"
    },
    value : {
        width: "150px",
        padding: "2px 8px",
        display: "inline",
        marginBottom: "20px"
    }
}

export class AddField extends Component {
    state = {
        fieldName : "",
        fieldValue : ""
    }
    
    handleInput = event => {
        const {name, value} = event.target
        this.setState(
            {[name]: value}
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("addNewField")
    }

    render() {  
        return (
            <div>
                <h4 className="school-sub-header">Add a New Field</h4>
                <Input style={styles.name} name="fieldName" onChange={this.handleInput} placeholder="New field name"/>
                <Input style={styles.value} name="fieldValue" onChange={this.handleInput} placeholder="New field value"/>
                <br />
                <Button size="sm" onClick={this.handleSubmit}>Add New Field</Button>
            </div>
        )
    }
}