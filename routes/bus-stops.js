const express = require('express');
const router = express.Router();
const BusStop = require('../models/Bus-stops');

// @route GET api/bus-stops/
// @desc Get coordinates of class
// @access Public
router.get('/', async (req, res) => {
    try {
        const results = await BusStop.find();
        res.json(results)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
})

module.exports = router;