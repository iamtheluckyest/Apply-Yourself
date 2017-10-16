import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Card, CardTitle, CardBody} from "reactstrap";
import {LoginPrompt} from "../Modals";
import API from "../../utils/API";

export class SearchResult extends Component {

    state = {
        schoolFound : false,
        schoolUserData : {},
        user: undefined,
        modal: false
    }


    componentDidMount() {
        this.getUser();
    }

    // Gets the user document based on user token
    getUser = () => {
        API.getUser()
        .then(res => this.setState({user: res.data}, () => this.findSchool()))
        .catch(err => {
            console.log(err)
            this.setState({user: undefined})
        })
    }

    // Adds a school on button click; then getsUser to change state and reset state
    addSchool = () => {
        API.addSchool(this.props.school.id)
        .then( () => this.getUser() )
        .catch( err=> console.log(err) )
    }

    // Deletes a school on button click; then getsUser to change state and reset state
    deleteSchool = schoolId => {
        API.deleteSchool(schoolId)
        .then( () => this.getUser() )
        .catch( err=> console.log(err) )
    }

    // If school is in user document, set the button to delete (x) instead of add (+)
    findSchool = () => {
        let school = this.state.user.colleges.filter( college => parseFloat(college.apiId) === this.props.school.id )[0]  
        this.setState({schoolUserData: school})
    }

    // Displays/hides modal on click.
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    render() {
        return (
            <Card className="mb-3">
                <CardBody>
                    <Link to={"/school/" + this.props.school.id} ><CardTitle style={{paddingRight: "40px"}}>{this.props.school["school.name"]}</CardTitle></Link>
                    {this.state.user
                            ?
                                this.state.schoolUserData
                                ? 
                                    <span className="iconHolder" onClick={ () => this.deleteSchool(this.state.schoolUserData._id)}>
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </span>
                                : 
                                    <span className="iconHolder" onClick={this.addSchool}>
                                        <i className="fa fa-plus-square" aria-hidden="true"></i>
                                    </span>
                            :
                                <span className="iconHolder" onClick={this.toggle}>
                                    <i className="fa fa-plus-square" aria-hidden="true"></i>
                                    <LoginPrompt modal={this.state.modal} toggle={this.toggle}/>
                                </span>
                    }
                    <p>
                        <a href={"http://" + this.props.school["school.school_url"]} target="_blank">{this.props.school["school.school_url"]}</a>
                        <br />
                        {this.props.school["school.city"]}, {this.props.school["school.state"]}
                        <br />
                        In-state Tuition: {this.props.school["2015.cost.tuition.in_state"]}
                        <br />
                        Out-of-state Tuition: {this.props.school["2015.cost.tuition.out_of_state"]}
                    </p>
                </CardBody>
            </Card>
        )
    }
}