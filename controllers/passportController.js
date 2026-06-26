exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.loginFormGet = (req, res, next) => {
  res.render("loginForm", { messages: req.session.messages });
  next();
};

exports.clearFailMessages = (req, res) => {
  if (req.session.messages) {
    req.session.messages = [];
  }
};
