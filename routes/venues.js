const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// @route GET api/venues/:venue
// @desc Get coordinates of class
// @access Public
router.get('/:venue', async (req, res) => {
    const venue = req.params.venue;
    console.log(venue)
    try {
        const results = await Venue.find({ venue })
        res.json(results[0].location)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
})

module.exports = router;