import React from "react";

export class Title extends React.Component {
    constructor(props){
        super(props);
        document.title = this.props.title;
    }
    render(){
        return(
            <div>
            </div>
        );
    }
}