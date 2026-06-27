const { Router } = require("express");
const { messageFormGet } = require("../controllers/messagesController");

const messageRouter = Router();

messageRouter.get("/", messageFormGet);

module.exports = messageRouter;
