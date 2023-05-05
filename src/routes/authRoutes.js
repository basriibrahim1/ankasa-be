const express = require("express");
const router = express.Router();
const {registerUserController, loginUserController, otp} = require("../controllers/authController");

router.post("/register", registerUserController);
router.post("/login",   loginUserController);
router.get("/otp/:id/:code", otp);

module.exports = router;