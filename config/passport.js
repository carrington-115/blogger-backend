const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { findUserById, findUserByUsername } = require("../models/userModel");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);
      if (!user)
        return done(null, false, { message: "The user does not exist" });
      const isMatch = await bcrypt.compare(password, user?.encryptedPassword);
      if (!isMatch)
        return done(null, fale, { message: "The password does not match" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id._id);
    return done(null, user);
  } catch (error) {
    return done(null, error);
  }
});

module.exports = passport;
