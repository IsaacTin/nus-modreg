const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Module = require('../models/Module');

// Search-related module requests

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

module.exports = router;
