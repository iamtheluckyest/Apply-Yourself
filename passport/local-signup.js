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
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim(),
        colleges : []
    };

    const newUser = new User(userData);
    newUser.save((err, myUser) => {
        if (err) { 
            console.log(err);
            return done(err); 
        }

        const payload = {
            sub: myUser._id
        };
        const token = jwt.sign(payload, config.jwtSecret);
        return done(null, token, myUser);
    });
});