const mongoose = require('mongoose');

const BusStopSchema = mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: [],
    },
    code: {
        type: String,
    },
    routes: {
        type: [],
    }
})

module.exports = mongoose.model('bus-stops', BusStopSchema)