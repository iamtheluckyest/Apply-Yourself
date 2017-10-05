const express = require('express');
const router = new express.Router();
const User = require("../models/User.js");
const moment = require("moment");

/**
 * 
 * @param {*} value 
 * returns null if not valid. otherwise returns the value in either a number, date, or string format
 */
const validateReqValue = function(value){
    if(typeof value === "string"){
        let val = parseFloat(value);
        if(isNaN(val)){
            val = moment(value);
            if(!val.isValid()){
                val = value; // i don't know what this is, but it's a string
            } else {
                val = val.toDate();
            }
        }
        return val;
    } else {
        return null;
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} collegeApiId 
 * 
 * returns an object with the index of the college found in the array and the college itself
 */
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

/**
 * 
 * @param {*} myKey 
 * @param {*} myVal 
 * @param {*} myArr 
 * 
 * returns index of key value pair in an array
 */
const findValForKey = function(myKey, myVal, myArr){
    let i = 0;
    for(i; i < myArr.length; i++){
        if(myArr[i][myKey] === myVal){
            return i;
        }
    }
    return -1;
}

/**
 * 
 * @param {*} user 
 * @param {*} reqIndex 
 * @param {*} collegeObj 
 * @param {*} myFieldName 
 * @param {*} myFieldValue 
 * 
 * returns a promise. Promise resolves to a user object
 */
const setRequirement = function(user, reqIndex, collegeObj, myFieldName, myFieldValue){
    const promise = new Promise(function(resolve, reject){
        if(validateReqValue(myFieldValue) === null){
            console.log("Application requirement in wrong format");
            return reject(new Error("Application requirement in wrong format"));
        }
        let college = collegeObj.college;
        let i = collegeObj.index;
        const reqObj = {
            name : myFieldName,
            value : myFieldValue
        }
        //updating
        if(reqIndex !== -1){
            college.appRequirements.set(reqIndex, reqObj);
        }
        //vs adding 
        else {
            college.appRequirements.push(reqObj);
        }
        user.colleges.set(i, college);
        user.save(err => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                console.log("successful requirement field saved");
                resolve(user);
            }
        });
    });
    return promise;
}

//get back the user
router.get('/', (req, res) => {
    console.log("hit the get user route. User is:");
    const user = res.locals.user;
    console.log(user);
    return res.json(user);
});

//add a new college
/*
    Expects body to be:
    {
        collegeApiId : id of college from api (number)
    }
*/
router.post("/college", (req, res) => {
    console.log("Hit the post route to add a new college. User is:");
    let user = res.locals.user;
    const oldUser = res.locals.user;
    console.log(user);
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(!collegeObj.college){
        //add a new college. set names of note and app requirement fields to the names specified in the default arrays on user.
        user.colleges.push({
            "apiId" : req.body.collegeApiId,
            notes : user.defaultNoteFields.map(element => {
                return ({ 
                    name: element,
                    value : "",
                });
            }),
            appRequirements : user.defaultAppRequirements.map(element => {
                return ({
                    name: element,
                    value : ""
                });
            }),
        });
        //save the user
        user.save(err => {
            if(err){
                console.log(err);
                res.json(oldUser);
            } else {
                console.log("successfully added a college.");
                res.json(user);
            }
        })
    } else {
        console.log("user already has a college with that api ID");
        res.json(oldUser);
    }
});

//delete a college
/*
    Expects body to be:
    {
        collegeApiId : id of college from api (number)
    }
*/
router.delete("/college", (req, res) => {
    console.log("Hit route to delete a college. User is: ");
    let user = res.locals.user;
    const oldUser = res.locals.user;
    console.log(user);
    user.colleges.pull({"apiId" : req.body.collegeApiId});
    user.save(function(err){
        if(err){
            console.log(err);
            res.json(oldUser);
        } else {
            res.json(user)
        }
    });
});

//add a new application requirement field
/*
    Expects body to be:
    {
        collegeApiId : id of college from api (number)
        fieldName : name of new field
        fieldValue : value of new field (hopefully this is just a string, number, or maybe a date obj. no complex data types)
    }
*/
router.post("/requirement", (req, res) => {
    console.log("Hit the post route to make a new requirement field. User is:");
    let user = res.locals.user;
    const oldUser = res.locals.user;
    console.log(user);
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(collegeObj.college) {
        console.log("college found:");
        console.log(collegeObj);
        if(findValForKey("name", req.body.fieldName, college.appRequirements) === -1){
            setRequirement(user, -1, collegeObj, req.body.fieldName, req.body.fieldValue).then(function(data){
                res.json(data);
            }).catch(function(err){
                res.json(oldUser);
            });
        } else {
            console.log("app requirement already exists");
            res.json(oldUser);
        }
    } else {
        console.log("college not found for api id");
        res.json(oldUser);
    }
});

//update an application requirement field
/*
    Expects body to be:
    {
        collegeApiId : id of college from api (number)
        fieldName : name of new field
        fieldValue : value of new field (hopefully this is just a string, number, or maybe a date obj. no complex data types)
    }
*/
router.put("/requirement", (req, res) => {
    console.log("Hit the post route to edit a requirement field. User is:");
    let user = res.locals.user;
    const oldUser = res.locals.user;
    console.log(user);
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(collegeObj.college) {
        console.log("college found:");
        console.log(collegeObj);
        let reqIndex = findValForKey("name", req.body.fieldName, college.appRequirements);
        if(reqIndex !== -1){
            setRequirement(user, reqIndex, collegeObj, req.body.fieldName, req.body.fieldValue).then(function(data){
                res.json(data);
            }).catch(function(err){
                res.json(oldUser);
            });
        } else {
            console.log("app requirement doesn't exist");
            res.json(oldUser);
        }
    } else {
        console.log("college not found for api id");
        res.json(oldUser);
    }
});

module.exports = router;