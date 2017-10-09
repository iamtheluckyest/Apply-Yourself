import React from "react";
import {Button} from "reactstrap";

export const PrefButton = props => {
    let btnActive;
    if (props.currentElement) {
        btnActive = "active"
    }
    return (
        <Button 
            data-index={props.index} 
            onClick={ () => props.selectPref(props.index, props.PrefsArr)} 
            className={btnActive} 
            style={{margin: "5px"}}
        >
                {props.children}
        </Button>
    )
}