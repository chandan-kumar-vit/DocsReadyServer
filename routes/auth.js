const express = require('express');

const router = express.Router();

// Route 1:[POST & log-in not required] /api/auth/signup

router.post('/signup', [

],

    (req, res) => {

    });


// Route 2: [POST & log-in not required] /api/auth/login

// Route 3: [GET & log-in required] /api/auth/getuser

module.exports = router;