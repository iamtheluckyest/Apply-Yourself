import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = (props) => (
    <div className="container panel panel-default">
        <div className="panel-heading">
            <h2>Sign Up</h2>
        </div>
        <div className="panel-boody">
            {props.errors.summary && <p>{props.errors.summary}</p>}
            <form action="/" onSubmit={props.onSubmit}>

                <div className="input-group col-xs-12 myInputGroup">
                    <label>Name</label>
                    <input
                        className="form-control"
                        onChange={props.onChange}
                        type="text"
                        name="name"
                        value={props.user.name}
                    />
                </div>

                <div className="input-group col-xs-12 myInputGroup">
                    <label>Email</label>
                    <input
                        className="form-control"
                        onChange={props.onChange}
                        type="text"
                        name="email"
                        value={props.user.email}
                    />
                </div>

                <div className="input-group col-xs-12 myInputGroup">
                    <label>Password</label>
                    <input
                        className="form-control"
                        onChange={props.onChange}
                        type="password"
                        name="password"
                        value={props.user.password}
                    />
                </div>

                <button className="btn btn-primary col-xs-5 col-sm-2" type="submit">
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Create New Account
                </button>
            </form>
        </div>
        <div className="panel-footer">
            Already have an account? <Link to={'/login'}>Log in</Link>
        </div>
    </div>
);

export default SignUpForm;