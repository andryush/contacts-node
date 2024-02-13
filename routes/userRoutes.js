const express = require("express");
const { signUpUser, signInUser, me } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.get("/me", validateToken, me);

module.exports = router;
