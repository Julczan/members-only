const { body, validationResult, matchedData } = require("express-validator");

exports.membershipFormGet = (req, res) => {
  res.render("membershipForm");
};

const validateMember = [
  body("secret")
    .custom((value) => {
      return value === process.env.MEMBERSHIP_SECRET;
    })
    .withMessage("You gave a wrong secret"),
];

exports.membershipFormPost = [
  validateMember,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("membershipForm", {
        errors: errors.array(),
      });
    }
    //TODO: Get the logged in user and update isMember to true
    console.log("You became a member");
    res.redirect("/");
  },
];
