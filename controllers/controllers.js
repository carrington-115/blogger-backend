const { createUser } = require("../models/userModel");

const signUpUser = async (req, res) => {
  const { username, password } = req.body;
  const newUser = await createUser(username, password);
  if (newUser) {
    res.redirect("/auth/profile");
  } else {
    res.redirect("/auth/signup");
  }
};

const signOutUser = (req, res) => {
  req.signout((error) => {
    if (error) console.error(error);
    res.redirect("/auth/signup");
  });
};

const userProfile = (req, res) => {
  if (!req.isAuthenticated) res.redirect("/auth/login");
  const { username } = req.body;
  res.status(200).json({ status: true, username: username });
};

module.exports = { signUpUser, signOutUser, userProfile };
