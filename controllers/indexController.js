const { body, validationResult, matchedData } = require("express-validator");
const { generatePassword } = require("../lib/passwordUtils");
const { saveUser } = require("../config/queries");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 15 characters.";

const validateSignUp = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Username ${lengthErr}`),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

exports.signUpFormGet = (req, res) => {
  res.render("signUpForm");
};

exports.signUpFormPost = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUpForm", {
        errors: errors.array(),
      });
    }
    const { firstName, lastName, username, password } = matchedData(req);
    const hashedPassword = await generatePassword(password);
    await saveUser({ firstName, lastName, username, hashedPassword });
    res.redirect("/login");
  },
];
