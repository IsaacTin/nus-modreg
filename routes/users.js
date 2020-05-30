const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route	POST api/users
// @desc	Register NUSNET ID - for prototyping purposes
// @access	Public
router.post(
    '/',
    [
        check('name', 'Please add name').not().isEmpty(),
        check('nusnetID', 'Please enter a valid NUSNET ID').matches(
            /^e\d{7}$/i
        ),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
        check('major', 'Please enter your major').not().isEmpty(),
        check('year', 'Please enter your year of study')
            .isInt()
            .isLength({ min: 1, max: 1 }),
        check(
            'moduleCreditsAvailable',
            'Please enter your module credits allocated'
        )
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            nusnetID,
            password,
            major,
            year,
            moduleCreditsAvailable,
            modules
        } = req.body;

        try {
            let user = await User.findOne({ nusnetID });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({
                name,
                nusnetID,
                password,
                major,
                year,
                moduleCreditsAvailable,
                modules
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            res.status(201).json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
