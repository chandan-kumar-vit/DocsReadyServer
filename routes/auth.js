const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "" + process.env.JWT_SECRET;

// Route 1:[POST & log-in not required] /api/auth/signup

router.post('/signup', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password must be of minimum 5 characters').isLength({ min: 5 }),
    body('aadharNumber', 'Enter valid aadhar').isLength({ min: 12 })
],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            let user = await User.findOne({ aadharNumber: req.body.aadharNumber });
            if (user) {
                res.status(400).json({ error: "Sorry! Aadhar number already exists!" });

            }

            let success = false;

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                aadharNumber: req.body.aadharNumber,
                fatherName: req.body.fatherName,
                address: req.body.address,
                dob: req.body.dob
            });

            console.log(`New user with Aadhar number ${user.aadharNumber}, name: ${user.name}`);
            success = true;

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ user, authtoken, success });

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error!")
        }
    });


// Route 2: [POST & log-in not required] /api/auth/login

router.post('/login',
    [
        body('aadharNumber', 'Aadhar number cannot be left blank').exists(),
        body('password', 'Password cannot be blank').exists()
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { aadharNumber, password } = req.body;
        try {

            let user = await User.findOne({ aadharNumber: aadharNumber });
            if (!user) {
                res.status(400).json({ error: "Aadhar Number not registered" });
            }
            let success = false;

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ success, error: "Incorrect Password!" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ user, authtoken, success });
            console.log(`${user.aadharNumber} Logged-in successfully`);

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    });


// Route 3: [POST & log-in required] /api/auth/getuser

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal sever error!");
    }
})

module.exports = router;