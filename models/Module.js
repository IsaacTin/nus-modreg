const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema({
    moduleName: {
        type: String,
        required: true
    },
    moduleCode: {
        type: String,
        required: true
    },
    moduleCredits: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('module', ModuleSchema);
