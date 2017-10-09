import React, {Component} from "react";
import {Input} from "reactstrap"

const styles = {
    icon : {
        position: "static"
    },
    input : {
        width: "250px",
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
        event.preventDefault();
        this.setState({edit: !this.state.edit}, () => {
            if (this.state.edit === false) {
                this.props.handleSubmit(this.props.field, this.props.note)
            }
        })
    }

    render() {
        return (
            this.state.edit
                ?
                <tr>
                    <th width="250px">
                    {this.props.field.name} 
                    </th>
                
                    <td>
                        <Input style={styles.input} placeholder="Add data" onChange={this.props.handleInput} name={this.props.field._id}/> 
                    </td>
                    <td>
                        <i onClick={this.toggleEdit} style={styles.icon} className="fa fa-check-square" aria-hidden="true"></i>
                    </td>
                </tr>
                :
                <tr>
                    <th width="200px">
                    {this.props.field.name} 
                    </th>

                    <td> 
                        {this.props.field.value || "..."}
                    </td>
                    <td width="75px">
                        <i onClick={this.toggleEdit} style={styles.icon} className="fa fa-pencil-square-o" aria-hidden="true" title="Edit field"></i> 
                        <span> </span>
                        <i style={styles.icon} className="fa fa-times" aria-hidden="true" title="Delete field"></i>
                    </td>
                </tr>
            
        )
    } 
}