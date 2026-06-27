const { Router } = require("express");
const {
  messageFormGet,
  messageFormPost,
} = require("../controllers/messagesController");

const messageRouter = Router();

messageRouter.get("/", messageFormGet);
messageRouter.post("/", messageFormPost);

module.exports = messageRouter;
