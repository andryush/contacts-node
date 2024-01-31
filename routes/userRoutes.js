const express = require("express");
const { signUpUser, signInUser } = require("../controllers/userController");

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);

module.exports = router;
