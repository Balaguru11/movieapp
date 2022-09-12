const express = require("express");
const router = express.Router();

const {
  signUp,
  loginController,
  logoutController,
} = require("../controller/authController");

router.post("/signup", signUp);
router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
