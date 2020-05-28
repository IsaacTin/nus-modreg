const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route	POST api/auth
// @desc	Auth user and get token
// @access	Public
router.post(
    '/',
    [
        check('nusnetID', 'Please include a valid NUSNET ID').matches(
            /^e\d{7}$/i
        ),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nusnetID, password } = req.body;

        try {
            let user = await User.findOne({ nusnetID });

            // if no user with that email exists
            if (!user) {
                return res.status(400).json({
                    msg: 'Invalid Credentials'
                });
            }

            // boolean that returns true if they match
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    msg: 'Invalid Credentials'
                });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 3600000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route	GET api/auth
// @desc	Get logged in user
// @access	Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
