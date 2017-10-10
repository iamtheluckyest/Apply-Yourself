import React from "react";
import {Button} from "reactstrap";

export const DeleteButton = props => {
    return (
        <Button 
            onClick={(event) => {
                event.preventDefault();
                props.deleteMethod(props.index);
            }}
            style={{margin: "5px"}}
        >
                {props.myName}
        </Button>
    )
}