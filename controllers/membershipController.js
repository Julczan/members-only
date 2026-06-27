const { body, validationResult, matchedData } = require("express-validator");
const { updateMembership } = require("../config/queries");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("membershipForm", {
        errors: errors.array(),
      });
    }
    await updateMembership(req.user.id);
    console.log(`Hello ${req.user.username}, you became a member`);
    res.redirect("/");
  },
];
