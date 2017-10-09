const jwt = require('jsonwebtoken');
const User = require("../models/User.js");
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    console.log("setting user data in login");
    console.log(email + " " + password);
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    // find a user by email address
    return User.findOne({ email: userData.email }, (err, user) => {
        if (err) { 
            console.log(err);   
            return done(err); 
        }

        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }

        // check if a hashed user's password is equal to a value saved in the database
        //method comes from the model
        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (err) { 
                return done(err); 
            }

            if (!isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
                return done(error);
            }

            let payload = {
                sub: user._id
            };

            // create a token string
            let token = jwt.sign(payload, config.jwtSecret);
            let data = {
                name: user.name
            };

            return done(null, token, data);
        });
    });
});