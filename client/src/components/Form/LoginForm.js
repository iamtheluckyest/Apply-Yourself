import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = (props) => (
    <div className="container panel panel-default">
        <div className="panel-heading">
            <h2>Login</h2>
        </div>
        <div className="panel-body">
            {props.successMessage && <p className="success-message">{props.successMessage}</p>}
            {props.errors.summary && <p>{props.errors.summary}</p>}
            <form action="/" onSubmit={props.onSubmit}>
                
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
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Login
                </button>
            </form>
        </div>
        <div className="panel-footer">
            Don't have an account? <Link to={'/signup'}>Sign Up</Link>
        </div>
    </div>
);

export default LoginForm;