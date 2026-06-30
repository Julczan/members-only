const { body, validationResult, matchedData } = require("express-validator");
const { createMessage, deleteMessageFromDB } = require("../config/queries");

const validateMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("Title must be between 1 and 15 characters"),
  body("message")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Message must be between 1 and 50 characters"),
];

exports.messageFormGet = (req, res) => {
  res.render("messageForm");
};

exports.messageFormPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("messageForm", {
        errors: errors.array(),
      });
    }
    const { title, message } = matchedData(req);
    const author_id = req.user.user_id;
    await createMessage({ title, message, author_id });
    res.redirect("/");
  },
];

exports.deleteMessage = async (req, res) => {
  await deleteMessageFromDB(req.params.message_id);
  res.redirect("/");
};
