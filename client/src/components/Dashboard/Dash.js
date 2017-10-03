import React from 'react';
import PropTypes from 'prop-types';

const Dash = (props) => (
    props.user
        ?
            <h2>Hi {props.user.name}</h2>
        :
            <div></div>
)

Dash.propTypes = {
    user:  PropTypes.shape({
        name : PropTypes.string.isRequired
    }),
};

export { Dash };