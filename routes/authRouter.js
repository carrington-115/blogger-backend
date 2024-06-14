const express = require("express");
const {
  signUpUser,
  signOutUser,
  userProfile,
} = require("../controllers/controllers");
const passport = require("../config/passport");
const { autoAuthRedirectMiddleware } = require("../middleware/middleware");
const router = express.Router();

router.post("/signup", autoAuthRedirectMiddleware, signUpUser);
router.post(
  "/login",
  autoAuthRedirectMiddleware,
  passport.authenticate("local", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/signup",
    failureFlash: true,
  })
);
router.post("/logout", signOutUser);
router.get("/profile", userProfile);

module.exports = router;
