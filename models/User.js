const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//var customFields = require('mongoose-custom-fields');

const FieldSchema = new mongoose.Schema({
    name : String,
    value : {}
});
//FieldSchema.plugin(customFields);

const CollegeSchema = new mongoose.Schema({
    apiId : Number,
    Notes : [FieldSchema],
    appRequirements : [FieldSchema]
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    name: String,
    colleges : [CollegeSchema],
    notes : [{
        name : String,
        note : String
    }],
    appRequirements : [FieldSchema]
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