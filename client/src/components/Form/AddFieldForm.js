import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const AddFieldForm = (props) => (
    <Form onSubmit={props.onSubmit}>
        <FormGroup >
            <Label for="email">Field Name</Label>
            <Input 
                className="form-control"
                onChange={props.onChange}
                type="text"
                name="fieldName"
                id="fieldName"
                value={props.nameField}
            />
        </FormGroup>

        <FormGroup>
            <Label for="password">Field Value</Label>
            <Input
                className="form-control"
                onChange={props.onChange}
                type="text"
                name="fieldValue"
                id="fieldValue"
                value={props.valueField}
            />
        </FormGroup>

        <Button className="btn btn-primary" type="submit">
            Add
        </Button>
    </Form>
);