const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocDetailsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    card: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,

    },
    fileId: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
    },
    dob: {
        type: Date
    },
    fatherName: {
        type: String
    },
    address: {
        type: String
    },
    webContentLink: {
        type: String,
        required: true
    },
    webViewLink: {
        type: String,
        required: true
    }

});

const Documents = mongoose.model('docdetails', DocDetailsSchema);
module.exports = Documents;