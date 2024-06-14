const { createUser } = require("../models/userModel");

const signUpUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await createUser(username, password);
    res.send("Data is submitted");
  } catch (error) {
    console.error(error);
  }
};

const signOutUser = (req, res) => {
  req.signout((error) => {
    if (error) console.error(error);
    res.redirect("/auth/login");
  });
};

const userProfile = (req, res) => {
  if (!req.isAuthenticated) res.redirect("/auth/login");
  const { username } = req.user;
  res.status(200).json({ status: true, username: username });
};

module.exports = { signUpUser, signOutUser, userProfile };
