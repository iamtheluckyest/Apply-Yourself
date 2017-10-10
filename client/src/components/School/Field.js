import React, {Component} from "react";
import {Input} from "reactstrap"
import moment from "moment";

const styles = {
    icon : {
        position: "static"
    },
    input : {
        maxWidth: "250px",
        padding: "2px 8px",
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
            // If check is clicked
            if (this.state.edit === false) {
                this.props.handleSubmit(this.props.field, this.props.note)
            } 
            // If edit is clicked
            else {
                this.props.setStartText(this.props.field._id, this.props.field.value)
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
                        <Input style={styles.input} placeholder="Add data" onChange={this.props.handleInput} name={this.props.field._id} value={this.props.value}
                        /> 
                    </td>
                    <td>
                        <i onClick={this.toggleEdit} style={styles.icon} className="fa fa-check-square" aria-hidden="true"></i>
                        <span> </span>
                        <i onClick={ () => this.props.deleteField(this.props.field._id, this.props.note)} style={styles.icon} className="fa fa-times" aria-hidden="true" title="Delete field"></i>
                    </td>
                </tr>
                :
                <tr>
                    <th width="200px">
                    {this.props.field.name} 
                    </th>

                    <td> 
                        {this.props.field.value 
                            ? 
                            moment(this.props.field.value).isValid()
                                ? 
                                moment(this.props.field.value).format("dddd, MMMM Do YYYY") 
                                :
                                this.props.field.value 
                            : "..." }
                    </td>
                    <td width="75px">
                        <i onClick={this.toggleEdit} style={styles.icon} className="fa fa-pencil" aria-hidden="true" title="Edit field"></i> 
                        <span> </span>
                        <i onClick={ () => this.props.deleteField(this.props.field._id, this.props.note)} style={styles.icon} className="fa fa-times" aria-hidden="true" title="Delete field"></i>
                    </td>
                </tr>
            
        )
    } 
}