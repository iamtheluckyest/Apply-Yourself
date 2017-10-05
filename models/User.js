const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const requirementSchema = new mongoose.Schema({
    name : String,
    value : {}
});

const noteSchema = new mongoose.Schema({
    name : String,
    value : String,
})

const CollegeSchema = new mongoose.Schema({
    apiId : Number,
    notes : [noteSchema],
    appRequirements : [requirementSchema]
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    name: String,
    colleges : [CollegeSchema],
    defaultNoteFields : [{
        type : String
    }],
    defaultAppRequirements : [{
        type : String
    }]
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 * Runs before each user is saved
 */
UserSchema.pre('save', function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')){
        return next();
    } 

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { 
            console.log(saltError);
            return next(saltError); 
        }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { 
                console.log(hashError);
                return next(hashError); 
            }

            // replace a password string with hash value
            user.password = hash;

            return next();
        });
    });
});


module.exports = mongoose.model('User', UserSchema);