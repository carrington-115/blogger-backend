const { createUser } = require("../models/userModel");
const passport = require("../config/passport");

const signUpUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await createUser(username, password);
    res.status(200).json({ success: true, message: "Data is submitted" });
  } catch (error) {
    console.error(error);
  }
};

const loginInUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed", info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "login failed" });
      }

      return res
        .status(200)
        .json({ success: true, message: "User is logged in", user });
    });
  })(req, res, next);
};

const signOutUser = (req, res) => {
  req.signout((error) => {
    if (error) console.error(error);
    res.redirect("/auth/login");
  });
};

const userProfile = (req, res) => {
  try {
    if (!req.isAuthenticated) res.redirect("/auth/login");
    const { username } = req.user;
    if (!username) res.redirect("/auth/login");
    res.status(200).json({ status: true, username: username });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { signUpUser, signOutUser, userProfile, loginInUser };
