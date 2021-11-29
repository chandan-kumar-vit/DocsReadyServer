const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true
    },
    fatherName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('users', UserSchema);
module.exports = User;