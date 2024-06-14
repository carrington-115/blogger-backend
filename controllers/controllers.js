const { createUser } = require("../models/userModel");

const signUpUser = async (req, res) => {
  const { username, password } = req.body;
  const newUser = await createUser(username, password);
  if (newUser) {
    res.status(200).json({ created: true, username: username });
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

module.exports = { signUpUser, signOutUser };
