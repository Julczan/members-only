const { Router } = require("express");
const {
  signUpFormGet,
  signUpFormPost,
  indexPage,
} = require("../controllers/indexController");
const passport = require("passport");
const {
  logOut,
  loginFormGet,
  clearFailMessages,
} = require("../controllers/passportController");
const { isAuth, isMember, isAdmin } = require("./authMiddleware");
const { deleteMessage } = require("../controllers/messagesController");

const indexRouter = Router();

indexRouter.get("/log-in", loginFormGet, clearFailMessages);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
);
indexRouter.get("/log-out", logOut);
indexRouter.get("/", isAuth, isMember, isAdmin, indexPage);
indexRouter.get("/sign-up", signUpFormGet);
indexRouter.post("/sign-up", signUpFormPost);
indexRouter.post("/:message_id/delete", deleteMessage);

module.exports = indexRouter;
