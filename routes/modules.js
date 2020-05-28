// this is a CRUD route: Create, Read, Update, Delete
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Module = require('../models/Module');

// Module-only requests

// @route	POST api/modules
// @desc	Add new module
// @access	Public
router.post(
    '/',
    [
        check('moduleName', 'Provide module name').not().isEmpty(),
        check('moduleCode', 'Provide module code').not().isEmpty(),
        check('moduleCredits', 'MCs for this module').isInt().not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { moduleName, moduleCode, moduleCredits } = req.body;

        try {
            let newModule = await Module.findOne({ moduleCode });

            if (newModule) {
                return res.status(400).json({ msg: 'Module already exists' });
            }

            newModule = new Module({
                moduleName,
                moduleCode,
                moduleCredits
            });

            const createdModule = await newModule.save();

            res.status(201).json(createdModule);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route	GET api/modules
// @desc	Search for module from database
// @access	Public
router.get('/', async (req, res) => {
    const { moduleName, moduleCode, moduleCredits } = req.body;

    const searchFields = {};
    // search module name by regex
    if (moduleName) searchFields.moduleName = new RegExp(moduleName, 'i');
    if (moduleCode) searchFields.moduleCode = moduleCode;
    if (moduleCredits) searchFields.moduleCredits = moduleCredits;

    try {
        const module = await Module.find(searchFields);
        res.json(module);
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ msg: 'Server Error' });
    }
});

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
    const { addModule, delModule } = req.body;

    let user = await User.findById(req.user.id);
    const modules = user.modules;

    if (addModule) {
        const index = modules.indexOf(delModule._id);
        if (index !== -1) {
            return res
                .status(400)
                .json({ msg: 'Module already taken by user' });
        }
        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { modules: [...modules, addModule._id] } },
            { new: true }
        );
    } else if (delModule) {
        const index = modules.indexOf(delModule._id);
        if (index === -1) {
            return res.status(404).json({ msg: 'Module not found' });
        }
        modules.splice(index, 1);
        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { modules: modules } },
            { new: true }
        );
    } else {
        return res.status(404).json({ msg: 'Request not found' });
    }
    res.json(user);
});

module.exports = router;
