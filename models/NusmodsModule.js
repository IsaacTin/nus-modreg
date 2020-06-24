const mongoose = require('mongoose');

const NusmodsModuleSchema = mongoose.Schema({
    moduleCode: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    moduleCredit: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    'nusmods-module',
    NusmodsModuleSchema,
    'nusmods-modules'
);
