const express = require('express');
const User = require('../models/User');
const router = express.Router();
const user = User;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = "INoteBook";

// Request 1 : Create a User using: POST "/api/auth/". Doesn't require Auth. No login require it will create new user.

router.post('/createUser', [
    body('name', 'Enter valid name...').isLength({ min: 5 }),
    body('email', 'Enter valid email...').isEmail(),
    body('password', 'Please use strong password....').isLength({ min: 5 })
]
    , async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check whether the user with same email exists already
        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: `Sorry a user with email ${req.body.email} already exists` })
            }
            // Generating hash
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }

    });

// Request 2 : Authenticate a user using POST "/api/auth/login", No login required
router.post('/login', [
    body('email', 'Enter valid email...').isEmail(),
    body('password', 'Password can not be blank...').exists()
]
    , async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({success, error: `Please try to login with correct credentials...` })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: `Please try to login with correct credentials...` })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(payload, JWT_SECRET);
            success = true;
            res.json({success, authToken});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);


// Request 3 : Get loggedin user details using POST "/api/auth/getUser", Login required
router.post('/getUser', fetchuser ,async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

}
);

module.exports = router;