const express = require("express");
const {
  signUpUser,
  signOutUser,
  userProfile,
} = require("../controllers/controllers");
const passport = require("passport");
const { autoAuthRedirectMiddleware } = require("../middleware/middleware");
const router = express.Router();

router.post("/signup", autoAuthRedirectMiddleware, signUpUser);
router.post(
  "/login",
  autoAuthRedirectMiddleware,
  passport.authenticate("local", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
router.post("/auth/logout", signOutUser);
router.get("/profile", userProfile);

module.exports = router;
