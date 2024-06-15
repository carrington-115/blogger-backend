const express = require("express");
const {
  signUpUser,
  signOutUser,
  userProfile,
  loginInUser,
} = require("../controllers/controllers");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginInUser);

router.post("/logout", signOutUser);
router.get("/profile", userProfile);

module.exports = router;
