const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcryptjs = require("bcryptjs");
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Caracteres Min 8 
const PASSWORD_PATTERN = /^.{8,}$/;
const SALT_WORK_FACTOR = 10;

const LIST_ADMINS = 'c.arranz.arevalo@gmail.com';

const ADMINS = LIST_ADMINS.split(';');

const userSchema = new Schema({
    name: {
        type: String,
        maxLength: [20, 'The name cannot have more than 20 chars'],
        trim: true,
        required: 'The name is required'
    },
    email: {
        type: String,
        required: 'User email is required',
        lowercase: true,
        trim: true,
        unique: true,
        match: [EMAIL_PATTERN, 'Invalid email']
    },
    phone: {
        type: Number,
        required: 'The phone is required'
    },
    password: {
        type: String,
        required: 'User password is required',
        match: [PASSWORD_PATTERN, 'The password need at least 8 chars']
    },
    keyFoods:{
        type: [String]
    },
    isAdmin: {
        type: Boolean
    }
});

userSchema.pre('save', function(next){
    this.isAdmin = ADMINS.includes(this.email);
    if (this.isModified('password')) {
        return bcryptjs
            .hash(this.password, SALT_WORK_FACTOR)
            .then(hash => {
                this.password = hash
                next();
            })
            .catch(next)
    } else {
        next();
    }
})

userSchema.methods.checkPassword = function(passwordToCheck) {
    return bcryptjs.compare(passwordToCheck, this.password);
}

const User = mongoose.model('user', userSchema)

module.exports = User;