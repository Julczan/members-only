const { body, validationResult } = require("express-validator");

exports.signUpFormGet = (req, res) => {
  res.render("signUpForm");
};

exports.signUpFormPost = (req, res) => {
  res.render("signUpForm");
};
