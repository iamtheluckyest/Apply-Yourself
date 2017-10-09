import React from "react";
import {Button, Form, FormGroup, Input} from "reactstrap"

export const AddPref = props => {
    return (
        <Form>
            <FormGroup>
                <Input style={{width:"150px", margin:"auto", display:"inline"}} onChange={props.onChange} name={props.name} placeholder="New Criteria"/>
                <Button style={{margin:"-5px auto auto 10px"}} onClick={(event) => {
                        event.preventDefault();
                        console.log(props.fieldName);
                        props.addMyPref(props.arr, props.fieldName);
                    }}>Add</Button>
            </FormGroup>
        </Form>
    )
}