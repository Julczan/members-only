const { getAllMessages } = require("../config/queries");

exports.isAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const userMessages = await getAllMessages();
    res.render("index", {
      userMessages: userMessages,
      isAuth: false,
      isMember: false,
    });
  }
};

exports.isMember = async (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_member) {
    next();
  } else {
    const userMessages = await getAllMessages();

    res.render("index", {
      userMessages: userMessages,
      isAuth: true,
      isMember: false,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_member && req.user.is_admin) {
    next();
  } else {
    const userMessages = await getAllMessages();

    res.render("index", {
      userMessages: userMessages,
      isAuth: true,
      isMember: true,
      isAdmin: false,
    });
  }
};
