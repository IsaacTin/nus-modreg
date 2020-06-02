const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const User = require('../models/User');
const Module = require('../models/Module');

// User-related module requests

// @route	GET api/user-modules
// @desc	Load all of the user's modules
// @access	Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.modules);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route 	PUT api/user-modules
// @desc 	Update user's modules
//@access	Private
router.put('/:id', auth, async (req, res) => {
    let user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    const { modules } = req.body;

    if (!modules) {
        return res.status(404).json({ msg: 'Request not found' });
    }

    // verify that each module code in the array of modules actually exists
    modules.forEach((module) => {
        Module.findById(module).catch((err) => {
            return res.status(400).json({ msg: 'Bad request' });
        });
    });

    user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { modules } },
        { new: true }
    );
    res.json(user);
});

module.exports = router;
