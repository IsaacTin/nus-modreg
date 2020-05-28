const mongoose = require('mongoose');
// const Module = require('./Module');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nusnetID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    moduleCreditsAvailable: {
        type: Number,
        required: true
    },
    modules: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'modules'
    }
});

module.exports = mongoose.model('user', UserSchema);
