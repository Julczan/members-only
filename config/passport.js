const passport = require("passport");
const { findUserByUsername, findUserById } = require("./queries");
const { validatePassword } = require("../lib/passwordUtils");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await findUserByUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await validatePassword(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await findUserById(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
