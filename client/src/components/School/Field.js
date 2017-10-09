import React, {Component} from "react";
import {Button, Form, FormGroup, Input} from "reactstrap"

const styles = {
    icon : {
        position: "static"
    },
    input : {
        width: "150px",
        padding: "2px 8px",
        margin: "4px",
        display: "inline"
    }
}

export class Field extends Component {
    state = {
        edit : false
    }

    componentDidMount() {
        if (!this.props.field.value) {
            this.setState({edit: true})
        }
    }

    toggleEdit = event => {
        this.setState({edit: !this.state.edit}, () => {
            if (this.state.edit === false) {
                this.props.handleSubmit(this.props.field, event)
            }
        })
    }

    render() {
        return (
            <span>
                {this.props.field.name}: {
                    this.state.edit
                    ?
                    <span>
                        <Input style={styles.input} placeholder="Add data" onChange={this.props.handleInput} name={this.props.field._id}/> 
                        <i onClick={this.toggleEdit} style={styles.icon} className="fa fa-check-square" aria-hidden="true"></i>
                    </span>
                    :
                    <span> 
                        {this.props.field.value || "No value set."}
                        <span style={{marginLeft:"15px"}}>
                            <i onClick={this.toggleEdit} style={styles.icon} className="fa fa-pencil-square-o" aria-hidden="true" title="Edit field"></i> 
                            <i style={styles.icon} className="fa fa-times" aria-hidden="true" title="Delete field"></i>
                        </span>
                    </span>
                } 
                <br />
            </span>
            
        )
    } 
}