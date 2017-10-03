const express = require('express');
const router = new express.Router();
const User = require("../models/User.js");

router.get('/', (req, res) => {
    console.log("hit the get user route. User is:");
    const user = res.locals.user;
    console.log(user);
    return res.json(user);
});

module.exports = router;