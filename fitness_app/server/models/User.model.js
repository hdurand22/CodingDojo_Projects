const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [2, "First name must be at least 2 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [2, "Last name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Email must be a valid pattern"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters"]
    },
    workouts: {
        type: Array,
        required: [false]
    }

}, { timestamps: true })

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords do not match")
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;