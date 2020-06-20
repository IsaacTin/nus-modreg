const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// const Module = require('../models/Module');
const NusmodsModule = require('../models/NusmodsModule');

// Search-related module requests

// @route	POST api/search-modules
// @desc	Add new module
// @access	Public
// router.post(
//     '/',
//     [
//         check('moduleName', 'Provide module name').not().isEmpty(),
//         check('moduleCode', 'Provide module code').not().isEmpty(),
//         check('moduleCredits', 'MCs for this module').isInt().not().isEmpty()
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { moduleName, moduleCode, moduleCredits } = req.body;

//         try {
//             let newModule = await Module.findOne({ moduleCode });

//             if (newModule) {
//                 return res.status(400).json({ msg: 'Module already exists' });
//             }

//             newModule = new Module({
//                 moduleName,
//                 moduleCode,
//                 moduleCredits
//             });

//             const createdModule = await newModule.save();

//             res.status(201).json(createdModule);
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// WITH OUR OWN MODULE DATA
// @route	GET api/search-modules
// @desc	Search for module from database
// @access	Public
// router.get('/:search', async (req, res) => {
//     const text = req.params.search;

//     // can only search by name or module code

//     const moduleCode = new RegExp(text, 'i');
//     const moduleName = new RegExp(text, 'i');
//     try {
//         const searchResultsByName = await Module.find({ moduleName });
//         const searchResultsByCode = await Module.find({ moduleCode });
//         const filtered = [
//             ...new Set(
//                 [...searchResultsByName, ...searchResultsByCode].map((module) =>
//                     module._id.toString()
//                 )
//             )
//         ];
//         res.json(filtered);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// });

// WITH NUSMODS
// @route	GET api/search-modules
// @desc	Search for module from database
// @access	Public
router.get('/:search', async (req, res) => {
    const text = req.params.search;

    // can only search by name or module code

    const title = new RegExp(text, 'i');
    const moduleCode = new RegExp(text, 'i');
    // const department = new RegExp(text, 'i');
    // const faculty = new RegExp(text, 'i');

    try {
        const searchResultsByTitle = await NusmodsModule.find({ title });
        const searchResultsByCode = await NusmodsModule.find({ moduleCode });
        // const searchResultsByDepartment = await NusmodsModule.find({
        //     department
        // });
        // const searchResultsByFaculty = await NusmodsModule.find({ faculty });

        const filtered = [
            ...new Set(
                [
                    ...searchResultsByTitle,
                    ...searchResultsByCode
                ].map((module) => module._id.toString())
            )
        ];
        res.json(filtered);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
