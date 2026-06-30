const { body, validationResult, matchedData } = require("express-validator");
const { updateAdmin } = require("../config/queries");

const validateAdmin = [
  body("adminPassword")
    .custom((value) => {
      return value === process.env.ADMIN_SECRET;
    })
    .withMessage("You gave a wrong secret"),
];

exports.adminFormGet = (req, res) => {
  res.render("adminForm");
};

exports.adminFormPost = [
  validateAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("adminForm", {
        errors: errors.array(),
      });
    }
    await updateAdmin(req.user.user_id);
    res.redirect("/");
  },
];
