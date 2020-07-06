const mongoose = require('mongoose');

const VenueSchema = mongoose.Schema({
    venue: {
        type: String,
    },
    roomName: {
        type: String,
    },
    floor: {
        type: Number,
    },
    location: {
        type: Object,
    }
})

module.exports = mongoose.model('venue', VenueSchema)