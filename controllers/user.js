const express = require('express');
const router = new express.Router();
const User = require("../models/User.js");

router.get('/', (req, res) => {
    console.log("hit the get user route. User is:");
    const user = res.locals.user;
    console.log(user);
    return res.json(user);
});

router.post("/requirement", (req, res) => {
    console.log("Hit the post route to make a new requirement field. User is:");
    const user = res.locals.user;
    console.log(user);
    let college = undefined;
    let i = 0;
    for(i; i < user.colleges.length; i++){
        if(user.colleges[i].id === req.body.collegeId){
            college = user.colleges[i];
            break;
        }
    }
    if(college) {
        console.log("college found:");
        console.log(college);
        college.appRequirements.push({
            name : req.body.fieldName,
            value : req.body.fieldValue
        });
        user.colleges.set(i, college);
        user.save(err => {
            if(err){
                console.log(err);
                res.json({});
            } else {
                console.log("successful save");
                res.json(user);
            }
        });
    } else {
        res.json({});
    }
});

module.exports = router;