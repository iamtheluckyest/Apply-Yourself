const express = require('express');
const router = new express.Router();
const User = require("../models/User.js");
const moment = require("moment");
var mongoose = require('mongoose');

/**
 * 
 * @param {*} value 
 * returns null if not valid. otherwise returns the value in either a number, date, or string format
 */
const validateReqValue = function(value){
    if(typeof value === "string"){
        let val = value;
        const regEx = /^(([0-9]*\.[0-9]+)|([0-9]+))$/
        if(regEx.test(value)){
            value = parseFloat(value);
        } else {
            value = moment(value);
            if(value.isValid()){
                value = value.toDate();
            } else {
                value = val;
            }
        }
        return value;
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
const setRequirement = function(user, id, collegeObj, myFieldName, myFieldValue){
    const promise = new Promise(function(resolve, reject){
        let convVal = validateReqValue(myFieldValue);
        if( convVal === null){
            console.log("Application requirement in wrong format");
            return reject(new Error("Application requirement value is in the wrong format"));
        }
        let college = collegeObj.college;
        let i = collegeObj.index;
        const reqObj = {
            name : myFieldName,
            value : convVal
        }
        //updating
        if(id){
            collegeObj.college.appRequirements.id(id).set(reqObj)
        }
        //vs adding 
        else {
            college.appRequirements.push(reqObj);
        }
        user.colleges.set(i, college);
        user.save((err, updatedUser) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                console.log("successful requirement field saved");
                resolve(updatedUser);
            }
        });
    });
    return promise;
}

//get back the user
router.get('/', (req, res) => {
    console.log("hit the get user route. User is:");
    let user = res.locals.user;
    console.log(user);
    return res.json(user);
});

//post new default requirements. Use this to create and update requirements
/*
    Expects body to be:
    {
        appRequirements : [String] - an array of strings
    }
*/
router.post("/default_requirements", (req, res) => {
    console.log("hit the route to post default requirements. User is:");
    let user = res.locals.user;
    console.log(user);
    user.defaultAppRequirements = req.body.appRequirements;
    user.save(function(err, updatedUser){
        if(err){
            console.log(err);
            res.json({error : true, message : "Error setting default application requirements."});
        } else {
            console.log("successfully posted default application requirements");
            res.json(updatedUser);
        }
    });
});

//post new default notes. Use this to create and update default notes.
/*
    Expects body to be:
    {
        noteFields : [String] - an array of strings
    }
*/
router.post("/default_notes", (req, res) => {
    console.log("hit the route to post default requirements. User is:");
    let user = res.locals.user;
    console.log(user);
    user.defaultNoteFields = req.body.noteFields;
    user.save(function(err, updatedUser){
        if(err){
            console.log(err);
            res.json({error : true, message : "Error setting default notes"});
        } else {
            console.log("successfully posted default notes");
            res.json(updatedUser);
        }
    });
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
    console.log(user);
    req.body.collegeApiId = parseInt(req.body.collegeApiId);
    if (req.body.collegeApiId){
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
            user.save((err, updatedUser) => {
                if(err){
                    console.log(err);
                    res.json({error : true, message: "Error adding new college. Please try again later."});
                } else {
                    console.log("Successfully added a college.");
                    res.json(updatedUser);
                }
            })
        } else {
            res.json({error : true, message: "You have already added this college."});
        }
    } else {
        res.json({error: true, message: "Id is not a number." })
    }
});

//delete a college
/*
    Expects body to be:
    {
        collegeId : id of college from our database (string)
    }
*/
router.delete("/college", (req, res) => {
    console.log("Hit route to delete a college. User is: ");
    let user = res.locals.user;
    console.log(user);
    user.colleges.id(req.body.collegeId).remove(function(deleteErr){
        if(deleteErr){
            console.log(deleteErr);
            res.json({error : true, message : "Error deleting college."})
        } else {
            user.save(function(err, updatedUser){
                if(err){
                    console.log(err);
                    res.json({error : true, message : "Error saving user after deletion."})
                } else {
                    res.json(updatedUser);
                }
            });
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
    console.log(user);
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(collegeObj.college) {
        console.log("college found:");
        console.log(collegeObj);
        setRequirement(user, null, collegeObj, req.body.fieldName, req.body.fieldValue).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json({error : true, message: err.message});
        });
    } else {
        console.log("college not found for api id");
        res.json({error : true, message: "Error adding a new application requirement."});
    }
});

//update an application requirement field
/*
    Expects body to be:
    {
        collegeApiId : id of college from api (number)
        fieldId : id of field to update
        fieldName : name of updated field
        fieldValue : value of updated field (hopefully this is just a string, number, or maybe a date obj. no complex data types)
    }
*/
router.put("/requirement", (req, res) => {
    console.log("Hit the put route to edit a requirement field. User is:");
    let user = res.locals.user;
    console.log(user);
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(collegeObj.college) {
        console.log("college found:");
        console.log(collegeObj);
        setRequirement(user, req.body.fieldId, collegeObj, req.body.fieldName, req.body.fieldValue).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json({error : true, message: err.message});
        });
    } else {
        console.log("college not found for api id");
        res.json({error : true, message: "Error updating application requirement."});
    }
});

//delete an application requirement
/*
    Expects body to be:
    {
        collegeApiId : id of college from api (number)
        fieldId : id of application requirement
    }
*/
router.delete("/requirement", (req, res) => {
    console.log("Hit the delete route to delete an application requirement");
    let user = res.locals.user;
    console.log("user");
    let collegeObj = getCollege(user, req.body.collegeApiId);
    if(collegeObj.college){
        console.log("college found:");
        console.log(collegeObj);
        collegeObj.college.appRequirements.id(req.body.fieldId).remove(function(err){
            if(err){
                console.log(err);
                res.json({error : true, message: "Error deleting an application requirement"});
            } else {
                user.save(function(saveErr, updatedUser){
                    if(saveErr){
                        console.log(saveErr);
                        res.json({error : true, message : "Error saving your profile after deleting application requirement"})
                    } else {
                        res.json(updatedUser);
                    }
                });
            }
        });
    }
});

module.exports = router;