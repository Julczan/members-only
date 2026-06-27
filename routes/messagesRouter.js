const { Router } = require("express");
const {
  messageFormGet,
  messageFormPost,
} = require("../controllers/messagesController");
const { isAuth } = require("./authMiddleware");

const messageRouter = Router();

messageRouter.get("/", isAuth, messageFormGet);
messageRouter.post("/", messageFormPost);

module.exports = messageRouter;
