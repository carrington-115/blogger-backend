const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy("local", async (username, password, done) => {
    try {
    } catch (error) {
      return done(error);
    }
  })
);
passport.serializeUser((user, done) => {
  done(user);
});
passport.deserializeUser();

module.exports = passport;
