const jwt = require('jsonwebtoken');
const User = require("../models/User.js");
const config = require('../config');
const secret = process.env.JWT_SECRET || config.jwtSecret;

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {

    console.log("middleware checker");

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, secret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { 
            return res.status(401).end();
        }

        //sub is added in local-login.js file
        const userId = decoded.sub;

        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            res.locals.user = user;//I do this in order to pass the user to the controller
            return next();
        });
    });
};