const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const User = require('../models/User');

// User-related module requests

// @route	GET api/modules
// @desc	Load all of the user's modules
// @access	Private
router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user.modules);
});

// @route 	PUT api/modules
// @desc 	Update user's modules
//@access	Private
router.put('/:id', auth, async (req, res) => {
    const { modules } = req.body;

    if (!modules) {
        return res.status(404).json({ msg: 'Request not found' });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: modules },
        { new: true }
    );
    res.json(user);
    // if (addModule) {
    //     const index = modules.indexOf(delModule._id);
    //     if (index !== -1) {
    //         return res
    //             .status(400)
    //             .json({ msg: 'Module already taken by user' });
    //     }
    //     user = await User.findByIdAndUpdate(
    //         req.user.id,
    //         { $set: { modules: [...modules, addModule._id] } },
    //         { new: true }
    //     );
    // } else if (delModule) {
    //     const index = modules.indexOf(delModule._id);
    //     if (index === -1) {
    //         return res.status(404).json({ msg: 'Module not found' });
    //     }
    //     modules.splice(index, 1);
    //     user = await User.findByIdAndUpdate(
    //         req.user.id,
    //         { $set: { modules: modules } },
    //         { new: true }
    //     );
    // } else {
    //     return res.status(404).json({ msg: 'Request not found' });
    // }
    // res.json(user);
});

module.exports = router;
