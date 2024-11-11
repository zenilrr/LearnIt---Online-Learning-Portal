const express = require("express");
const registerUser = require("../controllers/registerUser");
const authUser = require("../controllers/authUser"); // Correct import

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(authUser); // Use as a direct function

module.exports = router;
