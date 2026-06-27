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
  if (req.isAuthenticated() && req.user.ismember) {
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
