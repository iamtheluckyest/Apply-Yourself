const express = require('express');
const router = new express.Router();
const User = require("../models/User.js");

const getCollege = function(user, collegeApiId){
    let myObj = {
        index : -1,
        college : undefined,
    }
    let i = 0;
    for(i; i < user.colleges.length; i++){
        if(user.colleges[i].apiId == collegeApiId){
            myObj.college = user.colleges[i];
            myObj.index = i;
            break;
        }
    }
    return myObj;
}

router.get('/', (req, res) => {
    console.log("hit the get user route. User is:");
    const user = res.locals.user;
    console.log(user);
    return res.json(user);
});

router.post("/college", (req, res) => {
    console.log("Hit the post route to add a new college. User is:");
    let user = res.locals.user;
    console.log(user);
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(!collegeObj.college){
        user.colleges.push({
            "apiId" : req.body.collegeApiId,
            generalInfo : [],
            appRequirements : [],
        });
        user.save(err => {
            if(err){
                console.log(err);
                res.json(user);
            } else {
                console.log("successfully added a college.");
                res.json(user);
            }
        })
    } else {
        res.json(user);
    }
});

router.post("/requirement", (req, res) => {
    console.log("Hit the post route to make a new requirement field. User is:");
    let user = res.locals.user;
    console.log(user);
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(collegeObj.college) {
        let college = collegeObj.college;
        let i = collegeObj.index;
        console.log("college found:");
        console.log(college);
        college.appRequirements.push({//based on documentation, push on an array of subdocs automatically adds an "_id" attr
            name : req.body.fieldName,
            value : req.body.fieldValue
        });
        user.colleges.set(i, college);
        user.save(err => {
            if(err){
                console.log(err);
                res.json(user);
            } else {
                console.log("successful requirement field saved");
                res.json(user);
            }
        });
    } else {
        res.json(user);
    }
});

module.exports = router;