import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardFooter} from 'reactstrap';


export const SignUpForm = (props) => (
    <Card className="mb-5">
        <CardBody>
            {props.errors.summary && <p>{props.errors.summary}</p>}
            <Form action="/" onSubmit={props.onSubmit}>

                <FormGroup>
                    <Label for="name" >Name</Label>
                    <Input
                        className="form-control"
                        onChange={props.onChange}
                        type="text"
                        name="name"
                        id="name"
                        value={props.user.name}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        className="form-control"
                        onChange={props.onChange}
                        type="text"
                        name="email"
                        value={props.user.email}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        className="form-control"
                        onChange={props.onChange}
                        type="password"
                        name="password"
                        value={props.user.password}
                    />
                </FormGroup>

                <Button className="btn btn-primary" type="submit">
                    Create New Account
                </Button>
            </Form>
        </CardBody>
        <CardFooter className="panel-footer">
            Already have an account? <Link to={'/login'}>Log in</Link>
        </CardFooter>
    </Card>
);
