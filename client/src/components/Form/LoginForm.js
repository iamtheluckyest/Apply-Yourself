import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card, CardBlock, CardFooter, Row, Col } from 'reactstrap';

export const LoginForm = (props) => (
    <Card className="mb-5">
        <CardBlock>
            {props.successMessage && <p className="success-message">{props.successMessage}</p>}
            {props.errors.summary && <p>{props.errors.summary}</p>}
            <Form action="/" onSubmit={props.onSubmit}>
                <FormGroup >
                    <Label for="email">Email</Label>
                    <Input 
                        className="form-control"
                        onChange={props.onChange}
                        type="text"
                        name="email"
                        id="email"
                        value={props.user.email}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        className="form-control"
                        onChange={props.onChange}
                        type="password"
                        name="password"
                        id="password"
                        value={props.user.password}
                    />
                </FormGroup>

                <Button className="btn btn-primary" type="submit">
                    Login
                </Button>
            </Form>
        </CardBlock>
        <CardFooter>
            Don't have an account? <Link to={'/signup'}>Sign Up</Link>
        </CardFooter>
    </Card>
);
